import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationContent } from 'src/app/models/table-source.model';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const pagination: PaginationContent = {
    itemsPerPage: 3,
    totalItems: 10
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.itemsPerPage = pagination;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change page data on call onPageSelect', () => {
    component.onPageSelection(3);
    expect(component.currentPage).toBe(3);
  });

  it('should call onPageSelect with positive data', () => {
    spyOn( component, 'onPageSelection');
    component.onAdjacentPageSelection(1);
    expect(component.onPageSelection).toHaveBeenCalled();
  });

  it('should call onPageSelect with negative data', () => {
    spyOn( component, 'onPageSelection');
    component.currentPage = 3;
    component.onAdjacentPageSelection(-1);
    expect(component.onPageSelection).toHaveBeenCalled();
  });

});
