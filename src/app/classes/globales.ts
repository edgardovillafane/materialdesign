import { Injectable } from '@angular/core';

@Injectable()
export class Globales {
  companyIdSelected$: number;
  companyNameSelected$: 'DoorWifi';
  shopIdSelected$: number;
  shopNameSelected$: 'DoorWifi';

  nodoSelLevel$: number;
  seccionId$: number;
  sideBack$ = true;
  licSele$ = [];
  language$ = 'es';
  roles$: Roles[] = [
    {value: '1', viewValue: 'System Admin'},
    {value: '2', viewValue: 'Administrador Manusa'},
    {value: '3', viewValue: 'Administrador Distribuidor'},
    {value: '4', viewValue: 'Usuario Distribuidor'},
    {value: '5', viewValue: 'Subdistribuidor Administrador'},
    {value: '6', viewValue: 'Subdistribuidor User'},
    {value: '7', viewValue: 'Cliente Administrador'},
    {value: '8', viewValue: 'Cliente User'},
    {value: '9', viewValue: 'Usuario Final Administrador'}
  ];

  tipoElement$: TipoElemento[] = [
    {value: 2, shortName: 'S', longName: 'Selector'},
    {value: 3, shortName: 'UA', longName: 'Usuario Administrador'},
    {value: 4, shortName: 'VK', longName: 'Virtual Key'}
  ];

}
export interface Roles {
  value: string;
  viewValue: string;
}
export interface TipoElemento {
  value: number;
  shortName: string;
  longName: string;
}
