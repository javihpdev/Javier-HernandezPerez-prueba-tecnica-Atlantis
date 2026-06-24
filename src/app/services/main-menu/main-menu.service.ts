import { Injectable } from '@angular/core';
import { Roles } from '../../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class MainMenuService {

  private _menu = [
    {
      title: 'Maestros',
      link: '/masters',
      roles: [Roles.ADMIN],
      elements: [
        {
          title: 'Aerolíneas ZED',
          link: '/masters/zed-airlines',
          roles: [Roles.ADMIN]
        },
        {
          title: 'Aeropuertos',
          link: '/masters/airports',
          roles: [Roles.ADMIN]
        }
      ]
    },
    {
      title: 'Solicitudes',
      link: '/solicitudes',
      roles: [Roles.ADMIN, Roles.READER],
      elements: [
        {
          title: 'Billetes de recreo',
          link: '/solicitudes/billetes-de-recreo',
          roles: [Roles.ADMIN, Roles.READER]
        },
        {
          title: 'Billetes de servicio',
          link: '/solicitudes/billetes-de-servicio',
          roles: [Roles.READER]
        },
      ]
    },
    {
      title: 'Informes',
      link: '/informes',
      roles: [Roles.OPERATOR],
      elements: [
        {
          title: 'Detalle',
          link: '/informes/detalle',
          roles: [Roles.OPERATOR]
        },
        {
          title: 'Detalle por dirección',
          link: '/informes/detalle-por-direccion',
          roles: [Roles.OPERATOR]
        },
      ]
    }

  ]

  constructor() { }

  get menu(){
    return this._menu
  }
}
