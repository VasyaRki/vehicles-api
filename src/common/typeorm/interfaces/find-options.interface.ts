import { FindOptionsRelations } from 'typeorm';

import { OrderEnum } from '../enums/order.enum';

export interface FindOptions<Entity> {
  relations?: FindOptionsRelations<Entity>;
  sort?: [string, OrderEnum];
  page?: number;
  limit?: number;
}
