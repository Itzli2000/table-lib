import { PaginationContent } from './../../models/table-source.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {

  @Input() itemsPerPage: PaginationContent;
  @Output() pageSelected: EventEmitter<number>;
  totalItems: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  listOfAvailablePages: number[] = [];

  constructor() {
    this.currentPage = 1;
    this.pageSelected = new EventEmitter();
  }

  ngOnInit() {
    this.totalItems = this.itemsPerPage.totalItems;
    this.perPage = this.itemsPerPage.itemsPerPage;
    this.totalPages = Math.ceil(this.totalItems / this.perPage);
    for (let index = 1; index <= this.totalPages; index++) {
      this.listOfAvailablePages.push(index);
    }
  }

  onPageSelection(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.pageSelected.emit(pageNumber);
  }

  onAdjacentPageSelection(dir: number): void {
    if (dir < 0 && this.currentPage > 1) {
      this.onPageSelection(this.currentPage - 1);
    } else if (dir > 0 && this.currentPage < this.listOfAvailablePages.length) {
      this.onPageSelection(this.currentPage + 1);
    }
  }

}
