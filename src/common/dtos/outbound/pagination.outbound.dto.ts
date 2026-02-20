export class PaginationOutboundDto<T = any> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
