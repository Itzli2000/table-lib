import { TableSource, HeadersContent, PaginationContent } from './../../models/table-source.model';
import { Component, OnInit, Input, SecurityContext, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  @Input() sourceData: TableSource;
  @Output() functionEmmiter: EventEmitter<object>;
  headers: HeadersContent[];
  content: object[];
  pagedContent: object[];
  currentPage: number;
  sortOrder: number;
  pagination: PaginationContent = {
    itemsPerPage: null,
    totalItems: null
  };

  constructor(private sanitazer: DomSanitizer) {
    this.functionEmmiter = new EventEmitter();
  }

  ngOnInit() {
    this.headers = this.sourceData.headers;
    this.content = this.sourceData.content;
    this.pagination.itemsPerPage = this.sourceData.itemsPerPage || this.content.length;
    this.pagination.totalItems = this.content.length;
    this.currentPage = 1;
    this.sortOrder = 1;
    this.setPaginatedContent();
  }

  renderContent(item: any, type: any) {
    if (type !== 'icon' && type !== 'function') {
      return item[type];
    } else if (type === 'icon') {
      return this.returnIcon(item[type]);
    }
  }

  setPaginatedContent() {
    const start = this.currentPage === 1 ? 0 : this.pagination.itemsPerPage * (this.currentPage - 1);
    const end = this.pagination.itemsPerPage * this.currentPage;
    this.pagedContent = this.content.slice(start, end);
  }

  pageSelected(data: number) {
    this.currentPage = data;
    this.setPaginatedContent();
  }

  returnIcon(iconObject: object): SafeHtml {
    if (!iconObject) { return; }
    const iconText = iconObject['text'] ? iconObject['text'] : '';
    const iconSize = iconObject['size'] ? `fa-${iconObject['size']}` : ''
    const iconString = `<i class="fa fa-${iconObject['name']} ${iconSize}" >&nbsp;&nbsp;${iconText}</i>`;
    const icon: SafeHtml = this.sanitazer.sanitize(SecurityContext.HTML, iconString);
    return icon;
  }

  emmitFunctionCallback(data: object) {
    const response = {
      fName: data['fName'],
      parameters: data['parameters']
    };
    this.functionEmmiter.emit(response);
  }

  isSortable(item: object, type: string) {
    const resp = item.hasOwnProperty(type);
    return resp;
  }

  sortData(type: string) {
    const data = [...this.content];
    data.sort((a, b) => {
      let comparison = 0;
      if (a[type] > b[type]) {
        comparison = 1;
      } else if (a[type] < b[type]) {
        comparison = -1;
      }
      return comparison * this.sortOrder;
    });
    this.sortOrder = this.sortOrder > 0 ? -1 : 1;
    this.content = [...data];
    this.setPaginatedContent();
  }

}
