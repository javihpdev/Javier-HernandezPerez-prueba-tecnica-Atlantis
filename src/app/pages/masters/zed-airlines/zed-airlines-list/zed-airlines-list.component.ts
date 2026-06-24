import {Component, inject} from '@angular/core';
import {
  ExpansionPanelComponent
} from "../../../../components/material-components/expansion-panel/expansion-panel.component";
import {Paginator} from "../../../../classes/paginator/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../../../components/modals/confirm/confirm.component";
import {ActionEnum} from "../../../../enums/action.enum";
import {Airline} from "../../../../classes/airline/airline";
import {IAirline} from "../../../../interfaces/iAirline";
import {ZedAirlinesFormComponent} from "../zed-airlines-form/zed-airlines-form.component";
import {TableComponent} from "../../../../components/material-components/table/table.component";
import {TranslateModule} from "@ngx-translate/core";
import {SnackbarService} from "../../../../services/material-services/snackbar/snackbar.service";
import {ConfirmResultEnum} from "../../../../enums/confirm-result.enum";

@Component({
    selector: 'app-zed-airlines-list',
    imports: [
        ExpansionPanelComponent,
        TableComponent,
        TranslateModule,
        ZedAirlinesFormComponent
    ],
    templateUrl: './zed-airlines-list.component.html',
    styleUrl: './zed-airlines-list.component.scss'
})
export class ZedAirlinesListComponent {
  protected readonly ActionEnum = ActionEnum;
  private _snackbarService = inject(SnackbarService);
  data: Array<Airline> = [];
  columns: Array<{title: string, value: string, sortName: string}> = [
    {title: 'Código', value: 'code', sortName:"code"},
    {title: 'Aerolinea', value: 'name', sortName:"name"},
  ];
  loading: boolean = true;
  paginator: Paginator = new Paginator();
  constructor(private _dialog: MatDialog) {

    setTimeout(() => {
      this.data = [];
      this.data.push(new Airline({
        code: "AB",
        name: "AIR BERLIN",

      }));
      this.data.push(new Airline({
        code: "IB",
        name: "IBERIA",
      }));
      this.loading = false;
    }, 2000)
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(ZedAirlinesFormComponent, {
      data: {modal: true},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  async changeTableEvent(event: {paginator: Paginator}){
    console.log(event.paginator);
  }

  async actionEventClick(event: {action: ActionEnum, row: Airline}){
    if(event.action == ActionEnum.EDIT){
      const dialogRef = this._dialog.open(ZedAirlinesFormComponent, {
        data: {modal: true, action: ActionEnum.EDIT}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
    }
    if(event.action == ActionEnum.REMOVE){
      const dialogRef = this._dialog.open(ConfirmComponent);

      dialogRef.afterClosed().subscribe(result => {
        if(result == ConfirmResultEnum.OK){
          this._snackbarService.showSuccess('Se ha eliminado correctamente');
        }
      });
    }
  }

  filterEventClick(iAirline: IAirline){
    console.log(iAirline)
  }
}
