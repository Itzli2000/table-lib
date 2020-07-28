import { TableSource, HeadersContent } from './../../models/table-source.model';
import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  @Input() sourceData: TableSource;
  headers: HeadersContent[];
  content: object[];

  constructor(private sanitazer: DomSanitizer) { }

  ngOnInit() {
    this.headers = this.sourceData.headers;
    this.content = this.sourceData.content;
  }

  renderContent(item: any, type: any) {
    // console.log(item);
    // console.log(type);

    if (type !== 'icon') {
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

}
