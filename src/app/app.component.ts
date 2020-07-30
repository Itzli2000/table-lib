import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TableSource } from './models/table-source.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  content = [
    { id: 1, tipo: 'PAGARÉ', plazo: '15 días', fecha: new Date(), inicial: this.convertToCurrency(123456789) },
    { id: 2, tipo: 'OTRO', plazo: '150 días', fecha: new Date(), inicial: this.convertToCurrency(987654321) },
    { id: 3, tipo: 'PAGARÉ 1', plazo: '1 días', fecha: new Date(), inicial: this.convertToCurrency(678901234) },
    {
      id: 4, tipo: 'OTRO 2', plazo: '30 días', fecha: new Date(), inicial: this.convertToCurrency(102346789), icon: {
        name: 'long-arrow-right',
        size: '2x',
        text: 'test'
      }
    },
    {
      id: 5, tipo: 'OTRO 2', plazo: '30 días', fecha: new Date(), inicial: this.convertToCurrency(102346789), icon: {
        name: 'long-arrow-left',
        size: '3x',
      }
    },
    {
      id: 6, tipo: 'Funcion', inicial: this.convertToCurrency(102346789), function: {
        fName: 'testFunction',
        parameters: [6, 7, 'asas'],
        text: 'Abrir'
      }
    },
    {
      id: 7, tipo: 'Funcion', inicial: this.convertToCurrency(102346789), function: {
        fName: 'testFunction3',
        parameters: [{
          nombre: 'Juan',
          appellido: 'Perez'
        }],
        text: 'Abrir'
      }
    }
  ];

  headers = [
    { head: '', contentKey: 'icon' },
    { head: 'Tipo de inversión', contentKey: 'tipo', sort: true },
    { head: 'Plazo', contentKey: 'plazo', sort: true },
    { head: 'Fecha de inversión', contentKey: 'fecha', sort: true },
    { head: 'Saldo inicial', contentKey: 'inicial', sort: true },
    { head: 'Funcion', contentKey: 'function'  }
  ];

  data: TableSource = {
    title: 'Title',
    subtitle: 'here',
    headers: this.headers,
    content: this.content,
    itemsPerPage: 3,
  };

  ngOnInit(): void {
  }

  constructor(private currenciPipe: CurrencyPipe) { }

  convertToCurrency(quantity: number): string {
    const currency = this.currenciPipe.transform(quantity, 'MXN');
    return currency;
  }

  testFunction(params: any[]) {
    console.warn('llamada funcion con params ');
    console.table(params);
  }

  testFunction3(params: any[]) {
    console.warn('llamada funcion con params ');
    console.table(params);
  }

  emmitedFunction(data: object) {
    const functionCalled = data['fName'];
    const params = data['parameters'];
    if (this[functionCalled]) {
      this[functionCalled](params);
    }
  }

}
