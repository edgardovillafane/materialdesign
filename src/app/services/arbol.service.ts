import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Listado} from '../request/listados';
import {Companies} from '../classes/companies';
import {Globales} from '../classes/globales';
import {environment} from '../../environments/environment';
import {Shops} from '../classes/shops';


@Injectable()
export class ArbolService {
  url = environment.url;

  constructor(public globales: Globales,
              private http: HttpClient
             ) {
  }

  getListadoMachines(
    company_id,
    shop_id,
    limit,
    page,
    clave): Observable<Listado> {
    let query = this.url
      + 'api/machines?company_id=' + company_id
      + '&limit=' + limit
      + '&page=' + page
      + '&clave=' + clave;
    if (shop_id != null) {
      query += '&shop_id=' + shop_id;
    }
    return this.http.get<Listado>(
      query
    );
  }

  addNewDist(distribuidor: Companies) {
    const query = this.url + 'api/company/insert';
    return this.http.post<Companies>(
      query,
      distribuidor
    );
  }

  addNewShop(shop: Shops) {
    const query = this.url + 'api/shops/insert';
    return this.http.post<Companies>(
      query,
      shop
    );
  }
  editNodo(nodo: Companies) {
    const query = this.url + 'api/company/edit/' + nodo.id;
    return this.http.put<Companies>(
      query,
      nodo
    );
  }
  editShop(nodo: Companies) {
    const query = this.url + 'api/shops/edit/' + nodo.id;
    return this.http.put<Companies>(
      query,
      nodo
    );
  }
  deleteNodo(id) {
    const query = this.url + 'api/company/delete/' + id;
    return this.http.delete(
      query
    );
  }
  deleteShop(id) {
    const query = this.url + 'api/shops/delete/' + id;
    return this.http.delete(
      query
    );
  }
  getNodo(company_id): any {
    const query = this.url
      + 'api/company/ver?company_id=' + company_id;
    return this.http.get(
      query
    );
  }

  getShop(shop_id): any {
    const query = this.url
      + 'api/shops/ver?shop_id=' + shop_id;
    return this.http.get(
      query
    );
  }
  moveNodo(nodo) {
    const query = this.url + 'api/company/mover'
    ;
    return this.http.put(
      query,
      nodo
    );
  }
  getListadoDistribuidores(
    rolp,
    rols): Observable<Companies[]> {
    const query = this.url
      + 'api/company/names?rolp=' + rolp + '&rols=' + rols;
    return this.http.get<Companies[]>(
      query
    );
  }

}


