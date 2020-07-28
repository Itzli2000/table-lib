import { Component } from '@angular/core';
import { DataTableType } from './models/table-source.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  content = [
    { tipo: 'PAGARÉ', plazo: '15 días', fecha: new Date(), inicial: 123456789 },
    { tipo: 'OTRO', plazo: '150 días', fecha: new Date(), inicial: 987654321 },
    { tipo: 'PAGARÉ 1', plazo: '1 días', fecha: new Date(), inicial: 678901234 },
    {
      tipo: 'OTRO 2', plazo: '30 días', fecha: new Date(), inicial: 102346789, icon: {
        name: 'long-arrow-right',
        size: '2x',
        text: 'test'
      }
    },
    {
      tipo: 'OTRO 2', plazo: '30 días', fecha: new Date(), inicial: 102346789, icon: {
        name: 'long-arrow-left',
        size: '3x',
      }
    },
    {
      tipo: 'Funcion', fecha: new Date(), inicial: 102346789, icon: {
        name: 'long-arrow-left',
        size: '3x',
      }
    }
  ];

  headers = [
    { head: '', contentKey: 'icon' },
    { head: 'Tipo de inversión', contentKey: 'tipo' },
    { head: 'Plazo', contentKey: 'plazo' },
    { head: 'Fecha de inversión', contentKey: 'fecha' },
    { head: 'Saldo inicial', contentKey: 'inicial' }
  ];

  data: object = {
    title: 'Title',
    subtitle: 'here',
    headers: this.headers,
    content: this.content
  };

  // Table 2 data

  logo = 'https://www.w3.org/html/logo/downloads/HTML5_Logo_256.png';

  tableConfig: DataTableType = {
    columns: [
      { title: 'First Name', dataProperty: 'firstName', sortable: true, filterable: false },
      { title: 'Last Name', dataProperty: 'lastName', sortable: true, filterable: true },
      { title: 'Occupation', dataProperty: 'occupation', sortable: false, filterable: false },
      { title: 'Branch', dataProperty: 'companyBranch', sortable: false, filterable: true },
    ],
    rowActions: [
      { label: 'Edit', actionIdToReturn: 'edit', logoImageUrl: this.logo, showOption: (x: any) => true },
      { label: 'Copy', actionIdToReturn: 'copy', logoImageUrl: this.logo, showOption: (x: any) => x.completed },
      { label: 'Delete', actionIdToReturn: 'delete', logoImageUrl: this.logo, showOption: (x: any) => !x.isActive },
      { label: 'Message', actionIdToReturn: 'message', logoImageUrl: this.logo, showOption: (x: any) => x.permitsMessaging },
    ],
    rowsPerPage: 20,
    entriesPerPage: 5,
  };

}
