import {SortDirection} from "@angular/material/sort";

export class Paginator {

  private _pageNumber: number = 1;
  private _pageSize: number = 5;
  private _pageTotal: number = 0;
  private _orderField: string = '';
  private _orderType: SortDirection | "" = 'asc';


  get pageNumber(): number {
    return this._pageNumber;
  }

  set pageNumber(value: number) {
    this._pageNumber = value;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }

  get pageTotal(): number {
    return this._pageTotal;
  }

  set pageTotal(value: number) {
    this._pageTotal = value;
  }

  get orderField(): string {
    return this._orderField;
  }

  set orderField(value: string) {
    this._orderField = value;
  }

  get orderType(): SortDirection | "" {
    return this._orderType;
  }

  set orderType(value: SortDirection) {
    this._orderType = value;
  }
}
