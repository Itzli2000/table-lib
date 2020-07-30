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
    this.pagination.itemsPerPage = this.sourceData.itemsPerPage || 10;
    this.pagination.totalItems = this.content.length;
    this.currentPage = 1;
    this.setPaginatedContent();
  }

  setPaginatedContent() {
    const start = this.currentPage === 1 ? 0 : this.pagination.itemsPerPage * (this.currentPage - 1);
    const end = this.pagination.itemsPerPage * this.currentPage;
    this.pagedContent = this.content.slice(start, end);
    console.log(this.pagedContent);
  }

  renderContent(item: any, type: any) {
    // console.log(item);
    // console.log(type);

    if (type !== 'icon' && type !== 'function') {
      return item[type];
    } else if (type === 'icon') {
      return this.returnIcon(item[type]);
    }
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

  pageSelected(data: number) {
    console.log('pagina seleccionada ' + data);
    this.currentPage = data;
    this.setPaginatedContent();
  }

}
