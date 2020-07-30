export interface TableSource {
  title?: string;
  subtitle?: string;
  actions?: object;
  pagination?: number;
  headers: HeadersContent[];
  content: object[];
  itemsPerPage?: number;
}

export interface HeadersContent {
  head: string;
  contentKey: string;
}

export interface PaginationContent {
  itemsPerPage: number;
  totalItems: number;
}
