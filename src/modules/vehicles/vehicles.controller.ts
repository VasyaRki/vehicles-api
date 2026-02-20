import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from 'src/modules/auth';
import { IJwtPayloadDecorator } from 'src/common/jwt';
import { IJwtPayload } from 'src/common/jwt';
import { PaginationInboundDto, PaginationOutboundDto } from 'src/common/dtos';
import {
  VehicleOutboundDto,
  VehicleDetailOutboundDto,
  UpdateVehicleInboundDto,
  CreateVehicleInboundDto,
} from './dtos';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiOkResponse({ type: PaginationOutboundDto<VehicleOutboundDto> })
  @Get()
  public async getList(@Query() dto: PaginationInboundDto) {
    return this.vehiclesService.getList(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: VehicleDetailOutboundDto })
  @Get(':id')
  public async getOne(
    @Param('id', ParseIntPipe) id: number,
    @IJwtPayloadDecorator() payload?: IJwtPayload,
  ) {
    return this.vehiclesService.getOne(id, payload?.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: VehicleDetailOutboundDto })
  @Post()
  public async create(
    @Body() body: CreateVehicleInboundDto,
    @IJwtPayloadDecorator() payload: IJwtPayload,
  ) {
    return this.vehiclesService.create(body, payload.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: VehicleDetailOutboundDto })
  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateVehicleInboundDto,
    @IJwtPayloadDecorator() payload: IJwtPayload,
  ) {
    return this.vehiclesService.update(id, body, payload.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: number,
    @IJwtPayloadDecorator() payload: IJwtPayload,
  ) {
    return this.vehiclesService.remove(id, payload.id);
  }
}
