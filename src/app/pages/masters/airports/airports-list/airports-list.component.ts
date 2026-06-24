import {Component, inject} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {AirportsFormComponent} from "../airports-form/airports-form.component";
import {TableComponent} from "../../../../components/material-components/table/table.component";
import {Paginator} from "../../../../classes/paginator/paginator";
import {Airport} from "../../../../classes/airport/airport";
import {ConfirmComponent} from "../../../../components/modals/confirm/confirm.component";

import {
  ExpansionPanelComponent
} from "../../../../components/material-components/expansion-panel/expansion-panel.component";
import {ActionEnum} from "../../../../enums/action.enum";
import {IAirport} from "../../../../interfaces/iAirport";
import {SnackbarService} from "../../../../services/material-services/snackbar/snackbar.service";
import {ConfirmResultEnum} from "../../../../enums/confirm-result.enum";
import { RolesService } from '../../../../services/roles/roles.service';
import { Roles } from '../../../../enums/roles.enum';

@Component({
    selector: 'app-airports-list',
    imports: [
        TranslateModule,
        TableComponent,
        ExpansionPanelComponent,
        AirportsFormComponent
    ],
    templateUrl: './airports-list.component.html',
    styleUrl: './airports-list.component.scss'
})
export class AirportsListComponent {
  protected readonly ActionEnum = ActionEnum;
  private _snackbarService = inject(SnackbarService);
  private _rolesService = inject(RolesService);
  data: Array<Airport> = [];
  columns: Array<{title: string, value: string, sortName: string}> = [
    {title: 'Código', value: 'code', sortName:"code"},
    {title: 'Aeropuerto', value: 'name', sortName:"name"},
    {title: 'F. Recreo', value: 'recessDate', sortName:"recessDate"},
    {title: 'F. Servicio', value: 'serviceDate', sortName:"serviceDate"},
    {title: 'F. Cortesía', value: 'courtesyDate', sortName:"courtesyDate"},
    {title: 'Internacional', value: 'international', sortName:"international"},
    {title: 'National', value: 'national', sortName:"national"},
  ];
  loading: boolean = true;
  paginator: Paginator = new Paginator();
  constructor(private _dialog: MatDialog) {

    setTimeout(() => {
      this.data = [];
      this.data.push(new Airport({
        code: "LPA",
        name: "Gran Canaria",
        recessDate: "2024-01-01 23:56:00",
        serviceDate: "2024-01-01 23:56:00",
        courtesyDate: "2024-01-01 23:56:00",
        international: false,
        national: false
      }));
      this.data.push(new Airport({
        code: "TFN",
        name: "Tenerife Norte",
        recessDate: "",
        serviceDate: "",
        courtesyDate: "",
        international: false,
        national: false
      }));
      this.loading = false;
    }, 2000)
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(AirportsFormComponent, {
      data: {modal: true},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  async changeTableEvent(event: {paginator: Paginator}){
    console.log(event.paginator);
  }

  async actionEventClick(event: {action: ActionEnum, row: Airport}){
    if(event.action == ActionEnum.EDIT){
      const dialogRef = this._dialog.open(AirportsFormComponent, {
        data: {modal: true, action: ActionEnum.EDIT}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
    }
    if(event.action == ActionEnum.REMOVE){
      const dialogRef = this._dialog.open(ConfirmComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

        if(result == ConfirmResultEnum.OK){
          this._snackbarService.showError('Ha ocurrido un error');
        }
      });
    }
  }

  filterEventClick(iAirport: IAirport){
    console.log(iAirport)
  }

  isAllowed(){
    return this._rolesService.isAllowed([Roles.READER])
  }
}
