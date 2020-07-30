export interface TableSource {
  title?: string;
  subtitle?: string;
  actions?: object;
  pagination?: number;
  itemsPerPage?: number;
  headers: HeadersContent[];
  content: object[];
}

export interface HeadersContent {
  head: string;
  contentKey: string;
}

export interface PaginationContent {
  itemsPerPage: number;
  totalItems: number;
}
