import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DataVehiclesService } from 'src/data-access/vehicles';
import { Vehicle, VehicleFile } from 'src/core/entities';
import { PaginationInboundDto, PaginationOutboundDto } from 'src/common/dtos';
import {
  VehicleOutboundDto,
  VehicleDetailOutboundDto,
  UpdateVehicleInboundDto,
  CreateVehicleInboundDto,
} from './dtos';
import { DataFilesService } from 'src/data-access/file';
import { DataVehicleFilesService } from 'src/data-access/vehicle-files';
import { unlink } from 'fs/promises';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly dataVehiclesService: DataVehiclesService,
    private readonly dataFilesService: DataFilesService,
    private readonly dataVehicleFilesService: DataVehicleFilesService,
  ) {}

  async getList(
    dto: PaginationInboundDto,
  ): Promise<PaginationOutboundDto<VehicleOutboundDto>> {
    const pagination = await this.dataVehiclesService.findAndPaginate({
      limit: dto.limit,
      page: dto.page,
    });

    return {
      limit: pagination.limit,
      page: pagination.page,
      total: pagination.total,
      items: pagination.items.map((e) => VehicleOutboundDto.fromEntity(e)),
    };
  }

  async getOne(
    id: number,
    currentUserId?: number,
  ): Promise<VehicleDetailOutboundDto> {
    const vehicle = await this.dataVehiclesService.findOneById(id, {
      relations: { user: true },
    });
    if (!vehicle) throw new NotFoundException();
    const images = await this.dataVehicleFilesService.find(
      { vehicleId: id },
      { relations: { file: true } },
    );

    return VehicleDetailOutboundDto.fromEntity(
      vehicle,
      currentUserId,
      images.map((i) => i.file),
    );
  }

  async create(
    dto: CreateVehicleInboundDto,
    currentUserId: number,
  ): Promise<VehicleDetailOutboundDto> {
    const { imageIds, ...vehicleDto } = dto;
    const cover = imageIds[0];
    const vehicle = new Vehicle({
      ...vehicleDto,
      userId: currentUserId,
      imageId: cover,
    });
    const saved = await this.dataVehiclesService.save(vehicle);
    await this.syncImages(vehicle, imageIds);
    const images = await this.dataVehicleFilesService.find(
      { vehicleId: vehicle.id },
      { relations: { file: true } },
    );
    return VehicleDetailOutboundDto.fromEntity(
      saved,
      currentUserId,
      images.map((i) => i.file),
    );
  }

  async update(
    id: number,
    dto: UpdateVehicleInboundDto,
    currentUserId: number,
  ): Promise<VehicleDetailOutboundDto> {
    const { imageIds, ...vehicleDto } = dto;
    const vehicle = await this.dataVehiclesService.findOne(
      { id },
      { relations: { user: true }, findOrThrow: true },
    );

    if (vehicle.userId !== currentUserId) {
      throw new ForbiddenException('You are not the owner of this vehicle');
    }

    Object.assign(vehicle, vehicleDto);
    const updated = await this.dataVehiclesService.save(vehicle);

    await this.syncImages(vehicle, imageIds);

    const images = await this.dataVehicleFilesService.find(
      { vehicleId: vehicle.id },
      { relations: { file: true } },
    );

    return VehicleDetailOutboundDto.fromEntity(
      updated,
      currentUserId,
      images.map((i) => i.file),
    );
  }

  async remove(id: number, currentUserId: number): Promise<void> {
    const vehicle = await this.dataVehiclesService.findOne(
      { id },
      { findOrThrow: true },
    );

    if (vehicle.userId !== currentUserId) {
      throw new ForbiddenException('You are not the owner of this vehicle');
    }

    await this.syncImages(vehicle, []);

    await this.dataVehiclesService.delete({ id });
  }

  private async syncImages(vehicle: Vehicle, images: number[]): Promise<void> {
    const currentImages = await this.dataVehicleFilesService.find(
      {
        vehicleId: vehicle.id,
      },
      {
        relations: { file: true },
      },
    );

    const currentSet = new Set(currentImages.map((i) => i.fileId));
    const newSet = new Set(images);

    const imagesToDelete = currentImages.filter((i) => !newSet.has(i.fileId));
    const imagesToCreate = [...newSet].filter((id) => !currentSet.has(id));

    if (imagesToCreate.length) {
      await this.dataVehicleFilesService.saveMany(
        imagesToCreate.map(
          (fileId) => new VehicleFile({ fileId, vehicleId: vehicle.id }),
        ),
      );
    }

    for (const vf of imagesToDelete) {
      if (vf.file?.path) {
        await unlink(vf.file.path).catch(() => null);
      }

      await this.dataVehicleFilesService.delete({
        vehicleId: vf.vehicleId,
        fileId: vf.fileId,
      });
    }
  }
}
