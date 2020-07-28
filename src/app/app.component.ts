import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  content = [
    { tipo: 'PAGARÉ', plazo: '15 días', fecha: new Date(), inicial: this.convertToCurrency(123456789) },
    { tipo: 'OTRO', plazo: '150 días', fecha: new Date(), inicial: this.convertToCurrency(987654321) },
    { tipo: 'PAGARÉ 1', plazo: '1 días', fecha: new Date(), inicial: this.convertToCurrency(678901234) },
    {
      tipo: 'OTRO 2', plazo: '30 días', fecha: new Date(), inicial: this.convertToCurrency(102346789), icon: {
        name: 'long-arrow-right',
        size: '2x',
        text: 'test'
      }
    },
    {
      tipo: 'OTRO 2', plazo: '30 días', fecha: new Date(), inicial: this.convertToCurrency(102346789), icon: {
        name: 'long-arrow-left',
        size: '3x',
      }
    },
    {
      tipo: 'Funcion', fecha: new Date(), inicial: this.convertToCurrency(102346789), icon: {
        name: 'long-arrow-right',
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

  ngOnInit(): void {
  }

  constructor(private _cp: CurrencyPipe) { }

  convertToCurrency(quantity: number): string {
    const currency = this._cp.transform( quantity, 'USD', '1.0-0');
    return currency;
  }

}
