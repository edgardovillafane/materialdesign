import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Md5} from 'ts-md5';
import * as jwt_decode from 'jwt-decode';



export const TOKEN_NAME = 'auth_token';

@Injectable()
export class AuthService {
  tokenDeco: any;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) {
    this.tokenDeco = this.jwtHelperService.decodeToken();
  }


  login(username: string, password: string) {
    const pwd = Md5.hashStr(password);
    return this.http.post<any>(
      environment.url + TOKEN_NAME,
      {username, password: pwd});
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['login']);
  }

  loggedIn(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
    // l'undefined del token esta guardat
    // com a string i no com a undefined en si.
    if (!token || token === 'undefined') {
      return false;
    }
    this.tokenDeco = this.jwtHelperService.decodeToken();
    const tokenExpired: boolean =
      this.jwtHelperService.isTokenExpired(token);
    return !tokenExpired;


  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenDeco(): any {
    if (!this.tokenDeco) {
      this.tokenDeco = this.jwtHelperService.decodeToken();
    }
    return this.tokenDeco;
  }

  getCompanyName() {
    return this.getTokenDeco().companyName;
  }

  getCompanyId() {
    return this.getTokenDeco().companyId;
  }

  getCompanyTypeId() {
    return this.getTokenDeco().companyType;
  }

  getUserRol() {
    return this.getTokenDeco().userRol;
  }

  getUserName() {
    return this.getTokenDeco().userName;
  }

  isCompanyAuthorized(types: number[]): boolean {
    for (const type of types) {
      if (parseInt(this.getCompanyTypeId(), 10) === type) {

        return true;
      }
    }

    return false;
  }

  isUserAuthorized(roles: number[]): boolean {
    for (const rol of roles) {
      if (parseInt(this.getUserRol(), 10) === rol) {
        return true;
      }
    }
    return false;
  }

  refreshToken() {

  }

  getAuthorizationHeader() {
    return 'Bearer ' +
      this.getToken();
  }

}
