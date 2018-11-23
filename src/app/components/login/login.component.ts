import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {Snack} from '../../classes/snackbar';
import {UserService} from '../../services/user.service';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Globales} from '../../classes/globales';
import {Companies} from '../../classes/companies';
import {Constantes} from '../../classes/constantes';
import {Login} from '../../classes/login';
import {Md5} from 'md5-typescript';

/**
 * The Login component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: any;
  returnUrl: string;
  verToken = '';

  constructor(
    public snackBar: Snack,
    public globales: Globales,
    public esatUsuarios: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private auth: AuthService,
   ) {
  }

  @ViewChild('user') user: ElementRef;
  @ViewChild('password') password: ElementRef;

  ngOnInit() {
    this.returnUrl =
      this.route.snapshot
        .queryParams['returnUrl'] || '/';
  }

  doLogin() {
    const user = this.user.nativeElement.value;
    const password = this.password.nativeElement.value;
    if (user === '') {
      const mensaje = 'Ingrese un usuario';
      const accion = 'OK';
      this.snackBar.openSnackBar(mensaje, accion);
    } else if (password === '') {
      const mensaje = 'Ingrese una contraseña';
      const accion = 'OK';
      this.snackBar.openSnackBar(mensaje, accion);
    } else {
      const credential = <Login>({
        user: user,
        password: Md5.init(password)
      });
      // verifico que el email ingresado este en la BD
      this.esatUsuarios.validateLogin(credential)
        .subscribe(data => {
          this.result = data;
          let mensaje;
          if (this.result.token !== 0) {
            // Login Correcto
            this.auth.loggedIn(this.result.token);

            mensaje = 'Ingreso Correcto';
             this.router.navigate(['gestion']);
          } else {
            // ha fallado el login
            mensaje = 'Login Incorrecto';
            this.auth.logout();
          }
          this.snackBar.openSnackBar(
            mensaje,
            'OK');
        });
    }


  }

}

