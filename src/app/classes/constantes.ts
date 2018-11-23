import { Injectable } from '@angular/core';
@Injectable()
export class Constantes {
  public static ROL_DISTRIBUIDOR = 3;
  public static ROL_CLIENTE = 4;
  public static NODO_START_ID = 1;
  public static ID_MANUSA = 2;
  public static NODO_START_NAME = 'DoorWifi';
  public static PAGINADOR_INICIAL = 25;
  public static COLUMNAS_ESAT_MOBILE = [
    'check',
    'estado',
    'restantes',
    'nombre',
    'detalle'];
  public static COLUMNAS_ESAT_ESCRITORIO = [
    'check',
    'tipo',
    'estado',
    'restantes',
    'nombre',
    'telefono',
    'email',
    'compania',
    'detalle'];


}
