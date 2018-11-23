import {MediaMatcher} from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {MenuSuperiorComponent} from '../menu-superior/menu-superior.component';
import {ContainerListadosComponent} from '../container-listados/container-listados.component';
import {Globales} from '../../../classes/globales';
import {AuthService} from '../../../services/auth.service';

/**
 * WRAP COMPONENT
 *
 * This component in not a simple Wrapper. It works as the parent of all components including sidenav.
 * When some company is selected in Sidenav, a Observable Object change the value,
 * a Observer take this value by a Subscription. In order to pass values between child components,
 * the first child have to emit them first to the parent
 * and then the second child subscribe to the observable.
 */
@Component({
  selector: 'app-wrap-gestion-component',
  templateUrl: 'wrap-gestion.component.html',
  styleUrls: ['wrap-gestion.component.css'],
})

export class WrapGestionComponent
  implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('sidenav')
  side: SidenavComponent;
  @ViewChild('breadcrumb')
  bread: BreadcrumbComponent;
  @ViewChild('menusup')
  menusup: MenuSuperiorComponent;
  @ViewChild('contlistados')
  contlistados: ContainerListadosComponent;

  reset: number;
  mobileQuery: MediaQueryList;
  rol: string;
  nombre: string;
  private _mobileQueryListener: () => void;
  screenWidth: number;

  /**
   *
   * @param globales Injects vars shared by components eg. language
   * @param translate Injects translation module
   * @param changeDetectorRef Injects screen changes listener Module
   * @param media Injects module that returns the MediaQueryList for the query provided.
   * @param auth Injects the class for grant access by validation of Token
   */
  constructor(public globales: Globales,
              public translate: TranslateService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private auth: AuthService) {
    // aqui seteo el lenguaje por default en ingles
    // (cambiar a 'es' para español
    translate.setDefaultLang(this.globales.language$);
    this.mobileQuery = media.matchMedia(
      '(max-width: 600px)');
    this._mobileQueryListener = () =>
      changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(
      this._mobileQueryListener);
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  // metodo para cambiar el idioma de toda la SPA

  /**
   * When a new language is selected in the languages menu
   * this method change the global var language in order to keep it, while the language not change.
   * Also calls the methos use() injected by TranslateService
   * @param language
   */
  switchLanguage(language: string) {
    this.globales.language$ = language;
    this.translate.use(language);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(
      this._mobileQueryListener
    );
  }

  /**
   * Set the User Rol and Name to global var obtained directly from Token
   */
  ngOnInit() {
    this.rol = this.globales.roles$.find(x => x.value === this.auth.getUserRol()).viewValue;
    this.nombre = this.auth.tokenDeco.userName;
  }

  /**
   * After load, subscribe to a variable emitted by Main Menu of Sections.
   * Also receive the changes in observable Breadcrumb in order to change the path showed above list.
   */
  ngAfterViewInit() {
    // aqui recibo las variable del menu seccion
    setTimeout(() =>
      this.menusup.emitEvent
        .subscribe(
          seccion => {
            this.contlistados.asignaCont(seccion);
          }
        ), 500
    );

    // aqui escribe el camino de migas en el
    // componente hijo breadcrumb
    setTimeout(() =>
      this.side.emitEvent
        .subscribe(
          res => {
            switch (this.globales.seccionId$) {
              case 1: {
                this.reset = 2;
                break;
              }
              case 2: {
                this.reset = 3;
                break;
              }
              case 3: {
                this.reset = 1;
                break;
              }

            }
            this.contlistados.getListados(
              this.globales.seccionId$);
            this.bread.escribeMiga(res);
          }
        ), 1000
    );
  }

  /**
   * Method for logout. Call the logout() method injected by AuthService in this class
   */
  logout(): void {
    this.auth.logout();
  }
}



