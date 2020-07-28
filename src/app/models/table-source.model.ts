export interface TableSource {
  title?: string;
  subtitle?: string;
  actions?: object;
  pagination?: number;
  headers: HeadersContent[];
  content: object[];
}

export interface HeadersContent {
  head: string;
  contentKey: string;
}
