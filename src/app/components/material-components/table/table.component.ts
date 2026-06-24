import {AfterViewInit, Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {DatePipe} from "@angular/common";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {merge, of, startWith, switchMap} from "rxjs";
import {Paginator} from "../../../classes/paginator/paginator";
import {MatIcon} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {ActionEnum} from "../../../enums/action.enum";
import {CustomPaginatorIntl} from "../../../services/customPaginatorIntl";
import { RolesService } from '../../../services/roles/roles.service';
import { Roles } from '../../../enums/roles.enum';

@Component({
    selector: 'app-table',
    imports: [MatTableModule, MatPaginatorModule, MatSort, MatSortHeader, MatIcon, TranslateModule],
    providers: [
        DatePipe,
        { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit{
  protected readonly ActionEnum = ActionEnum;
  private _datePipe = inject(DatePipe);
  private _rolesService = inject(RolesService);
  /**
   * The columns variable is an array of objects representing columns.
   *
   * @type {Array<{title: string, value: string, sortName: string}>}
   */
  @Input({required: true}) columns: Array<{title: string, value: string, sortName: string}> = [];
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @Input({required: true}) paginator: Paginator = new Paginator();
  @ViewChild(MatSort) sort!: MatSort;
  @Input({required: true}) data: Array<object> = [];
  @Input({required: true}) loading: boolean = true;
  @Input() actions?: Array<ActionEnum.EDIT | ActionEnum.REMOVE>;

  @Output() changeData = new EventEmitter<{paginator: Paginator}>();
  @Output() actionEventClick = new EventEmitter<{action: ActionEnum, row: any}>();

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this._paginator.pageIndex = 0));

    merge(this.sort.sortChange, this._paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.paginator.orderType = this.sort.direction;
          this.paginator.orderField = this.sort.active;
          this.paginator.pageSize = this._paginator.pageSize;
          this.paginator.pageNumber = this._paginator.pageIndex+1;
          this.changeData.emit({paginator: this.paginator});
          return of(null);

        }),
      )
      .subscribe();
  }

  /**
   * Retrieve the displayed columns in the current view.
   *
   * @returns {Array<string>} An array of strings representing the displayed columns.
   */
  get displayedColumns(): Array<string>{
    const displayedColumns = this.columns.map(_column=> { return _column.sortName});
    if(this.actions){
      return displayedColumns.concat(['actions']);
    }
    return displayedColumns;
  }

  /**
   * Returns the value of a specific column in a given row.
   *
   * @param {any} row - The row object.
   * @param {{title: string, value: string}} column - The column object, consisting of a title and a value.
   * @returns {string|null} - The value of the column in the row, converted to a string. Returns null if the column value is not found.
   */
  getRow(row: any, column: {title: string, value: string}): string | null{

    if(typeof row[column.value] == "boolean"){
      return row[column.value] ? 'Si' : 'No';
    }

    const patternDate = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
    const patternDateTime = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);
    if(patternDate.test(row[column.value])){
      return this._datePipe.transform(row[column.value], 'dd-MM-yyyy')
    }
    if(patternDateTime.test(row[column.value])){
      return this._datePipe.transform(row[column.value], 'dd-MM-yyyy HH:mm:SS')
    }
    return row[column.value]
  }

  isAllowed(){
    return this._rolesService.isAllowed([Roles.READER]);
  }
}
