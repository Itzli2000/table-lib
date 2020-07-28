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

export interface DataTableType {
  columns: object[];
  rowActions: object[];
  rowsPerPage: number;
  entriesPerPage: number;
}

export interface PageChangeEventType {
  fromEntry: any;
  toEntry: any;
}

export interface RowActionWithData {
  actionToPerform: any;
  rowData: any;
}
