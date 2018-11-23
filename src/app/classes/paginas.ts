import {Injectable} from '@angular/core';
import {Constantes} from './constantes';

@Injectable()
export class Paginas {
  constructor() {
  }

  getLimite(limite) {
    return (limite)
      ? limite : Constantes.PAGINADOR_INICIAL;
  }

  getPagina(pagina) {
    return (pagina)
      ? pagina + 1 : 1;
  }

  getClave(clave) {
    return clave;
  }


}
