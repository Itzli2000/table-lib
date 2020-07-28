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

  returnIcon(iconName: string) {
    console.log(iconName);
    if (!iconName) { return; }
    const iconText = iconName['text'] ? iconName['text'] : '';
    const iconSize = iconName['size'] ? `fa-${iconName['size']}` : ''
    const iconString = `<i class="fa fa-${iconName['name']} ${iconSize}" >&nbsp;&nbsp;${iconText}</i>`;
    const icon: SafeHtml = this.sanitazer.sanitize(SecurityContext.HTML, iconString);
    return icon;
  }

}
