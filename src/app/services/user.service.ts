import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Invitaciones} from '../classes/invitaciones';
import {environment} from '../../environments/environment';
import {Users} from '../model/users';
import {Login} from '../classes/login';
import {Listado} from '../request/listados';


@Injectable()
export class UserService {
  url = environment.url;

  constructor(private http: HttpClient
             ) {
  }


  getEmails(val: string): any {
    return this.http.get(
      this.url + 'api/users/emails?query=' + val);
  }

  getListadoUsers(
    company_id,
    limit,
    page,
    clave): Observable<Listado> {
    const query = this.url
      + 'api/users?company_id=' + company_id
      + '&limit=' + limit
      + '&page=' + page
      + '&clave=' + clave;
    return this.http.get<Listado>(
     query);
  }

  getBuscarUsuarios(val): any {
    const query = this.url + 'api/users/name?query=' + val;
    return this.http.get(
      query
      );
  }

  sendInvitaciones(invitacion: Invitaciones) {
    // TODO: Change
    return this.http.post<Invitaciones>(
      'http://localhost/src/api/enviar-invitacion.php',
      invitacion);
  }

  addNewUser(user: Users) {
    const query = this.url + 'api/users/insert';
    return this.http.post<Users>(
      query,
      user);
  }

  validateLogin(credential: Login) {
    const query = this.url + 'api/authentication/validate';
    return this.http.post<Login>(
      query,
      credential);
  }

  obtenerToken(email) {
    return this.http.get(
      this.url + 'api/users/token?email=' + email);
  }
}


