import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Licencias} from '../classes/licencias';
import {Invitaciones} from '../classes/invitaciones';
import {Listado} from '../request/listados';
import {FileNode} from '../components/gestion/sidenav/sidenav.component';
import {Elements} from '../classes/elementos';
import {environment} from '../../environments/environment';
import {Revocar} from '../components/gestion/listado-esat/modales/revoke-lic/revoke-lic.component';


@Injectable({providedIn: 'root'})
export class EsatService {

  constructor(
    private http: HttpClient
  ) {

  }

  url = environment.url;


  getLicenses(
    company_id,
    shop_id,
    limit,
    page,
    clave,
    filter): Observable<Listado> {

    let query = 'api/licenses?company_id=' + company_id +
      '&limit=' + limit +
      '&page=' + page +
      '&clave=' + clave +
      '&filter=' + filter;
    if (shop_id != null) {
      query += '&shop_id=' + shop_id;
    }
    return this.http.get<Listado>(
      this.url + query);
  }


  getEmails(val: string): any {
    return this.http.get(
      this.url + 'api/users/emails?query=' + val);
  }


  getDistribuidores(val: string): any {
    return this.http.get(
      this.url + 'api/company/distribuidores?query=' + val);
  }

  getClientes(val: string, idDist: number): any {
    return this.http.get(
      this.url + 'api/company/clientes?query=' + val +
      '&idDist=' + idDist);
  }

  getArbol(val: number): Observable<FileNode[]> {
    return this.http.get<FileNode[]>(
      this.url + 'api/company/tree?company_id=' + val);

  }

  getChilds(val: number, nodoSel: number): Observable<FileNode[]> {
    return this.http.get<FileNode[]>(
      this.url + 'api/company/childs?company_id=' + val + '&nodo_sel=' + nodoSel);

  }

  revokeLicence(revocar: Revocar) {
    return this.http.put<Revocar>(
      this.url + 'api/licenses/revocar',
      revocar);

  }

  borrarLicence(borrar: Seleccion) {
    return this.http.put<Seleccion>(
      this.url + 'api/licenses/borrar',
      borrar);

  }

  assLicence(sel: Asignar) {
    return this.http.put<Asignar>(
      this.url + 'api/licenses/asignar',
      sel);

  }

  renovarLicence(renovar: Seleccion) {
    return this.http.put<Seleccion>(
      this.url + 'api/licenses/renovar',
      renovar);

  }

  addLicence(licencia: Licencias) {
    return this.http.post<Licencias>(
      this.url + 'api/licenses/create',
      licencia);
  }

  addNewElement(element: Elements) {
    const query = 'api/elements';
    return this.http.post<Elements>(this.url + query,
      element);
  }

  sendInvitaciones(invitacion: Invitaciones) {
    console.log(invitacion);
    return this.http.post<Invitaciones>(
      this.url + 'api/invitaciones/email',
      invitacion);
  }


}

export interface Seleccion {
  seleccionadas: any;
}

export interface Asignar {
  seleccionadas: any[];
  cliente: number;
}
