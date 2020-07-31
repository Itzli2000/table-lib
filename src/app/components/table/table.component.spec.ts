import { SafeHtml } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { HeadersContent, TableSource } from './../../models/table-source.model';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const content = [
    { id: 1, tipo: 'PAGARÉ', plazo: '15 días', fecha: new Date(), inicial: 123456789 },
    { id: 2, tipo: 'OTRO', plazo: '150 días', fecha: new Date(), inicial: 987654321 },
    { id: 3, tipo: 'PAGARÉ 1', plazo: '1 días', fecha: new Date(), inicial: 678901234 },
    {
      id: 4, tipo: 'OTRO 2', plazo: '30 días', fecha: new Date(), inicial: 102346789, icon: {
        name: 'long-arrow-right',
        text: 'test'
      }
    },
    {
      id: 5, tipo: 'OTRO 2', plazo: '30 días', fecha: new Date(), inicial: 102346789, icon: {
        name: 'long-arrow-left',
        size: '3x',
      }
    },
    {
      id: 6, tipo: 'Funcion', inicial: 102346789, function: {
        fName: 'testFunction',
        parameters: [6, 7, 'asas'],
        text: 'Abrir'
      }
    },
    {
      id: 7, tipo: 'Funcion', inicial: 102346789, function: {
        fName: 'testFunction3',
        parameters: [{
          nombre: 'Juan',
          appellido: 'Perez'
        }],
        text: 'Abrir'
      }
    }
  ];
  const headers: HeadersContent[] = [
    { head: '', contentKey: 'icon' },
    { head: 'Tipo de inversión', contentKey: 'tipo' },
    { head: 'Plazo', contentKey: 'plazo' },
    { head: 'Fecha de inversión', contentKey: 'fecha' },
    { head: 'Saldo inicial', contentKey: 'inicial' },
    { head: 'Funcion', contentKey: 'function' }
  ];
  const data: TableSource = {
    title: 'Title',
    subtitle: 'here',
    headers,
    content
  };
  const fakeNonExisteContent = { id: 3, NonExist: 'PAGARÉ 1', plazo: '1 días', fecha: new Date(), inicial: 678901234 };
  const fakeFunctionCall = {
    fName: 'testFunction3',
    parameters: [{
      nombre: 'Juan',
      appellido: 'Perez'
    }],
  };
  const sourceData: TableSource = data;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableComponent,
        PaginationComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.sourceData = sourceData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emmit a function call', () => {
    let fakeEmmited: object;
    component.functionEmmiter.subscribe((call: object) => fakeEmmited = call);
    component.emmitFunctionCallback(fakeFunctionCall);
    expect(fakeEmmited).toEqual(fakeFunctionCall);
  });

  it('should return an icon', () => {
    const item = {
      id: 4, tipo: 'OTRO 2', plazo: '30 días', fecha: new Date(), inicial: 102346789, icon: {
        name: 'long-arrow-right',
        text: 'test'
      }
    };
    const res: SafeHtml = component.renderContent(item, 'icon');
    expect(res).toBeTruthy();
  });

  it('shpuld set paginated content when current page is grater than 1', () => {
    component.currentPage = 3;
    component.setPaginatedContent();
    expect(component.pagedContent.length).toBe(0);
  });

  it('should set selected page and call setPaginatedContent', () => {
    spyOn( component, 'setPaginatedContent');
    component.pageSelected(2);
    expect(component.setPaginatedContent).toHaveBeenCalled();
  });

  it('should sort the data when recive sort type', () => {
    component.sortData('tipo');
    expect(component.sortOrder).toBe(-1);
  });

  it('should set sort order to negative', () => {
    component.sortOrder = -1;
    component.sortData('tipo');
    expect(component.sortOrder).toBe(1);
  });

});
