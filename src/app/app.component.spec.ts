import { CurrencyPipe } from '@angular/common';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app;
  let component: AppComponent;
  const fakeFunctionCall = {
    fName: 'testFunction3',
    parameters: [{
      nombre: 'Juan',
      appellido: 'Perez'
    }],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TableComponent,
        PaginationComponent
      ],
      providers: [
        CurrencyPipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call currency converter function', () => {
    spyOn(component, 'convertToCurrency');
    const currencyNumber = 123456789;
    const res = component.convertToCurrency(currencyNumber);
    expect(component.convertToCurrency).toHaveBeenCalledWith(currencyNumber);
  });

  it('should return currency string', () => {
    const currencyNumber = 123456789;
    const res = component.convertToCurrency(currencyNumber);
    expect(res).toBeTruthy();
    expect(res).toBe('MX$123,456,789.00');
  });

  it('should call testFunction3 function from emited response', () => {
    spyOn(component, 'testFunction3');
    component.emmitedFunction(fakeFunctionCall);
    expect(component.testFunction3).toHaveBeenCalledWith(fakeFunctionCall.parameters);
  });

  it('should call testFunction function from emited response', () => {
    spyOn(component, 'testFunction');
    const newData = {...fakeFunctionCall};
    newData.fName = 'testFunction';
    component.emmitedFunction(newData);
    expect(component.testFunction).toHaveBeenCalledWith(newData.parameters);
  });

  it('should not call function from emited response, if fName is wrong', () => {
    const newData = {...fakeFunctionCall};
    newData.fName = 'testFunction123';
    const res = component.emmitedFunction(newData);
    expect(res).toBe(undefined);
  });

  it('should call testFunction and log parameters', () => {
    const params: string[] = ['1', '2'];
    const res = component.testFunction(params);
    expect(res).toBe(undefined);
  });

  it('should call testFunction3 and log parameters', () => {
    const params: string[] = ['1', '2'];
    const res = component.testFunction3(params);
    expect(res).toBe(undefined);
  });

  it('should call ngOninit', () => {
    const res = component.ngOnInit();
    expect(res).toBe(undefined);
  });
});
