import { Injectable } from '@nestjs/common';
import { BaseCRUDService, FindOptions } from 'src/common/typeorm';
import { Vehicle } from 'src/core/entities';
import { EntityManager } from 'typeorm';
import { Pagination } from 'src/core/interfaces';

@Injectable()
export class DataVehiclesService extends BaseCRUDService<Vehicle> {
  protected entityClass = Vehicle;
  protected entityAlias = 'vehicles';

  constructor(protected entityManager: EntityManager) {
    super(entityManager);
  }

  public async findAndPaginate(
    options: FindOptions<Vehicle>,
  ): Promise<Pagination<Vehicle>> {
    const limit = parseInt(options?.limit as any, 10) || 15;
    const page = parseInt(options?.page as any, 10) || 1;

    const qb = this.entityManager.createQueryBuilder(
      this.entityClass,
      this.entityAlias,
    );

    qb.leftJoinAndSelect('vehicles.user', 'user');
    qb.leftJoinAndSelect('vehicles.image', 'image');

    if (options.sort) {
      qb.orderBy(...options.sort);
    } else {
      qb.orderBy('vehicles.id', 'DESC');
    }

    qb.take(limit);
    qb.skip((page - 1) * limit);

    const [items, total] = await qb.getManyAndCount();

    return { items, total, limit, page };
  }
}
