import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './components/app.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {CdkTableModule} from '@angular/cdk/table';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
import {

  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorIntl,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatStepperModule
} from '@angular/material';
import {LoginComponent} from './components/login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MenuSuperiorComponent} from './components/gestion/menu-superior/menu-superior.component';
import {MatPaginationIntlService} from './components/gestion/wrap-gestion/translate';
import {FileDatabase, SidenavComponent} from './components/gestion/sidenav/sidenav.component';
import {WrapGestionComponent} from './components/gestion/wrap-gestion/wrap-gestion.component';
import {BreadcrumbComponent} from './components/gestion/breadcrumb/breadcrumb.component';
import {ListadoArbolComponent} from './components/gestion/listado-arbol/listado-arbol.component';
import {ContainerListadosComponent} from './components/gestion/container-listados/container-listados.component';
import {ListadoUsuariosComponent} from './components/gestion/listado-usuarios/listado-usuarios.component';
import {NewDistComponent} from './components/gestion/listado-arbol/modales/new-dist/new-dist.component';
import {NewClientComponent} from './components/gestion/listado-arbol/modales/new-client/new-client.component';
import {NewLocalComponent} from './components/gestion/listado-arbol/modales/new-local/new-local.component';
import {EditNodeComponent} from './components/gestion/listado-arbol/modales/edit-node/edit-node.component';
import {ListadoEsatComponent} from './components/gestion/listado-esat/listado-esat.component';
import {SendRequComponent} from './components/gestion/listado-esat/modales/send-requ/send-requ.component';
import {RevokeLicComponent} from './components/gestion/listado-esat/modales/revoke-lic/revoke-lic.component';
import {AssignLicComponent} from './components/gestion/listado-esat/modales/assign-lic/assign-lic.component';
import {AssignDictioComponent} from './components/gestion/listado-esat/modales/assign-dictio/assign-dictio.component';
import {SendInvComponent} from './components/gestion/listado-usuarios/modales/send-inv/send-inv.component';
import {MoveNodeComponent} from './components/gestion/listado-arbol/modales/move-node/move-node.component';
import {VerDetalleEsatComponent} from './components/gestion/listado-esat/modales/ver-detalle-esat/ver-detalle-esat.component';
import {VerDetalleTreeComponent} from './components/gestion/listado-arbol/modales/ver-detalle-tree/ver-detalle-tree.component';
import {
  VerDetalleUsuariosComponent
} from './components/gestion/listado-usuarios/modales/ver-detalle-usuarios/ver-detalle-usuarios.component';
import {RouterModule} from '@angular/router';
import {EsatService} from './services/esat.service';
import {ArbolService} from './services/arbol.service';
import {UserService} from './services/user.service';
import {Snack} from './classes/snackbar';
import {Globales} from './classes/globales';
import {DataSharingService} from './services/data-sharing.service';
import {BottomSheetComponent} from './classes/bottom-sheet';
import {DialogModalComponent} from './classes/dialog-modal';
import {DeleteNodeComponent} from './components/gestion/listado-arbol/modales/delete-node/delete-node.component';
import {BuyLicenceComponent} from './components/gestion/listado-esat/modales/buy-licence/buy-licence.component';
import {DeleteLicComponent} from './components/gestion/listado-esat/modales/delete-lic/delete-lic.component';
import {RenewLicComponent} from './components/gestion/listado-esat/modales/renew-lic/renew-lic.component';
import {NewUserComponent} from './components/gestion/listado-usuarios/modales/new-user/new-user.component';
import {EditUserComponent} from './components/gestion/listado-usuarios/modales/edit-user/edit-user.component';
import {DeleteUserComponent} from './components/gestion/listado-usuarios/modales/delete-user/delete-user.component';
import {CreateLicComponent} from './components/gestion/listado-esat/modales/create-lic/create-lic.component';
import {JwtInterceptor, JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guard/auth.guard';
import {AuthInterceptor} from './auth-interceptor';
import {Paginas} from './classes/paginas';
import { LoaderComponent } from './loader/loader.component';
import {LoaderInterceptorService} from './services/loader-interceptor.service';
import { EditShopComponent } from './components/gestion/listado-arbol/modales/edit-shop/edit-shop.component';
import { DeleteShopComponent } from './components/gestion/listado-arbol/modales/delete-shop/delete-shop.component';
import { ListadoLicenciasComponent } from './components/gestion/listado-licencias/listado-licencias.component';

export function gettoken() {
  return localStorage.getItem('auth_token');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    MenuSuperiorComponent,
    SidenavComponent,
    WrapGestionComponent,
    BreadcrumbComponent,
    ListadoArbolComponent,
    ContainerListadosComponent,
    ListadoUsuariosComponent,
    DialogModalComponent,
    BottomSheetComponent,
    NewDistComponent,
    NewClientComponent,
    NewLocalComponent,
    EditNodeComponent,
    ListadoEsatComponent,
    SendRequComponent,
    RevokeLicComponent,
    AssignLicComponent,
    AssignDictioComponent,
    SendInvComponent,
    MoveNodeComponent,
    VerDetalleEsatComponent,
    VerDetalleTreeComponent,
    VerDetalleUsuariosComponent,
    DeleteNodeComponent,
    BuyLicenceComponent,
    DeleteLicComponent,
    RenewLicComponent,
    NewUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    CreateLicComponent,
    LoaderComponent,
    EditShopComponent,
    DeleteShopComponent,
    ListadoLicenciasComponent,


  ],
  entryComponents: [
    BottomSheetComponent,
    ListadoArbolComponent,
    ListadoEsatComponent,
    ListadoUsuariosComponent,
    DialogModalComponent,
    BuyLicenceComponent,
    MoveNodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTableModule,
    MatTableModule,
    FlexLayoutModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatBadgeModule,
    MatTooltipModule,
    RouterModule,
    MatSortModule,
    FormsModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatStepperModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: gettoken,
        whitelistedDomains: [environment.url]
      }
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    Globales,
    DataSharingService,
    ContainerListadosComponent,
    FileDatabase,
    {
      provide: MatPaginatorIntl,
      useFactory: (translate) => {
        const service = new MatPaginationIntlService();
        service.injectTranslateService(translate);
        return service;
      },

      deps: [TranslateService]
    },
    WrapGestionComponent,
    SidenavComponent,
    EsatService,
    ArbolService,
    UserService,
    AuthService,
    AuthGuard,
    AuthInterceptor,
    JwtInterceptor,
    LoaderInterceptorService,
    LoaderComponent,
    Paginas,
    {provide: Snack, useClass: Snack},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


