import { Injectable, NotFoundException } from '@nestjs/common';
import {
  FindOneOptions,
  ObjectLiteral,
  EntityManager,
  type FindOptionsWhere,
} from 'typeorm';

import { Class } from '../types';

@Injectable()
export abstract class BaseCRUDService<Entity extends ObjectLiteral> {
  protected abstract entityClass: Class<Entity>;

  protected entityAlias: string | undefined;

  protected get alias(): string {
    return this.entityAlias || this.entityClass.name.toLowerCase();
  }

  constructor(protected entityManager: EntityManager) {}

  find(
    where?: FindOneOptions<Entity>['where'],
    options?: {
      relations?: FindOneOptions<Entity>['relations'];
      order?: FindOneOptions<Entity>['order'];
      limit?: number;
    },
  ): Promise<Entity[]> {
    return this.entityManager.find(this.entityClass, {
      where,
      ...(options?.relations && { relations: options.relations }),
      ...(options?.order && { order: options.order }),
      ...(options?.limit && { take: options.limit }),
    });
  }

  async findOne(
    where: FindOneOptions<Entity>['where'],
    options?: {
      relations?: FindOneOptions<Entity>['relations'];
      findOrThrow?: boolean;
    },
  ): Promise<Entity | null> {
    const data = await this.entityManager.findOne(this.entityClass, {
      where,
      relations: options?.relations,
      withDeleted: true,
    });

    if (!data && options?.findOrThrow) {
      throw new NotFoundException(`Not found where: ${JSON.stringify(where)}`);
    }
    return data;
  }

  findOneById(
    id: number,
    options: { relations?: FindOneOptions<Entity>['relations'] } = {},
  ): Promise<Entity | null> {
    return this.entityManager.findOne(this.entityClass, {
      where: { id: id as any },
      ...(options?.relations && { relations: options?.relations }),
    });
  }

  save(entity: Entity): Promise<Entity> {
    return this.entityManager.save(entity);
  }

  saveMany(entities: Entity[]): Promise<Entity[]> {
    return this.entityManager.save(entities);
  }

  async update(
    entity: Entity,
    options: { relations?: FindOneOptions<Entity>['relations'] } = {},
  ): Promise<Entity> {
    await this.entityManager.update(this.entityAlias, entity.id, entity);
    return this.findOneById(entity.id, options);
  }

  async delete(criteria: FindOptionsWhere<Entity>): Promise<boolean> {
    const result = await this.entityManager.delete(this.entityClass, criteria);
    return !!result?.affected;
  }

  async softDelete(id: number): Promise<{ id: number }> {
    return await this.entityManager.softRemove(this.entityAlias, { id });
  }
}
