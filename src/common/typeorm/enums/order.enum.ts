export const OrderEnum = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;
export type OrderEnum = (typeof OrderEnum)[keyof typeof OrderEnum];
