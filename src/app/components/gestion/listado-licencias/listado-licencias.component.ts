import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
  MatBottomSheet,
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {EsatService} from '../../../services/esat.service';
import {ElementosDetail} from '../../../classes/elementos';
import {UsuariosBuscar} from '../../../classes/usuariosBuscar';
import {Observable} from 'rxjs';
import {Globales} from '../../../classes/globales';
import {DialogModalComponent} from '../../../classes/dialog-modal';
import {BottomSheetComponent} from '../../../classes/bottom-sheet';
import {MediaMatcher} from '@angular/cdk/layout';
import {LicenciasRed} from '../../../classes/licenciasred';
import {Constantes} from '../../../classes/constantes';
import {Icons} from '../../../classes/icons';
import {Paginas} from '../../../classes/paginas';
import {AuthService} from '../../../services/auth.service';
import { fromEvent } from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';


@Injectable()
@Component({
  selector: 'app-listado-licencias',
  templateUrl: './listado-licencias.component.html',
  styleUrls: ['./listado-licencias.component.css',
    '../container-listados/container-listados.component.css']
})
export class ListadoLicenciasComponent implements OnInit {
  mobileQuery: MediaQueryList;
  screenWidth: number;
  @Output() emit = new EventEmitter();
  displayedColumns: string[];
  filteredOptions: Observable<UsuariosBuscar[]>;
  dataSource = new MatTableDataSource<ElementosDetail>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('buscador') buscador: ElementRef;
  options: any[] = [];
  seleccionados: any[] = [];
  _totalRegistros: number;
  private _mobileQueryListener: () => void;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    public verListado: EsatService,
    public globales: Globales,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    public paginas: Paginas,
    private auth: AuthService
  ) {
    translate.setDefaultLang(this.globales.language$);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.responsiveColumns();
    };
  }

  get totalRegistros(): number {
    return this._totalRegistros;
  }

  ngOnInit() {
    // this.globales.companyIdSelected$ = this.auth.getCompanyId();
    // this.globales.shopIdSelected$ = null;
    this.setFiltrarCompany();
    this.responsiveColumns();
    this.dataSource.sort = this.sort;
    this.translate.use(this.globales.language$);
    this.globales.licSele$ = [];
    const obs = fromEvent(this.buscador.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(500)
      );
    obs.subscribe(() => this.setFiltrarCompany());
  }

  onSelCheckbox(elemento) {
    const licencia = <LicenciasRed>({
      id: elemento.id,
      estado: elemento.estado,
      nombre: elemento.name,
      emailUser: elemento.licEmail,
      icono: elemento.icono
    });

    const index: number =
      this.seleccionados.findIndex(x => x.id === elemento.id);
    if (index !== -1) {
      this.seleccionados.splice(index, 1);
    } else {
      this.seleccionados.push(licencia);
    }
    this.globales.licSele$ = this.seleccionados;
  }

  responsiveColumns() {
    this.displayedColumns = (this.mobileQuery.matches)
      ? Constantes.COLUMNAS_ESAT_MOBILE : Constantes.COLUMNAS_ESAT_ESCRITORIO;
  }

  setFiltrarCompany() {
    const limite = this.paginas.getLimite(this.paginator.pageSize);
    const pagina = this.paginas.getPagina(this.paginator.pageIndex);
    const clave = this.paginas.getClave(this.buscador.nativeElement.value);
    const filter = 'licencias';

    // carga el listado de elementos de ESAT
    this.verListado.getLicenses(
      this.globales.companyIdSelected$,
      this.globales.shopIdSelected$,
      limite,
      pagina,
      clave,
      filter
    ).subscribe(data => {
      this.dataSource.data = data.queryResult;
      setTimeout(() => {
        this.paginator.length = data.contador;
        this._totalRegistros = data.contador;
      }, 250);
      for (const fila of this.dataSource.data) {
        this.diasRestantesLicencia(fila);
        this.verificaLicenciaAsignada(fila);
        this.setGuionesLicenciasNoAsignadas(fila);
        this.iconoSegunTipoLic(fila);
      }
    });
  }

  verificaNodoSel() {
    return (this.globales.companyIdSelected$) ? this.globales.companyIdSelected$ : this.auth.getCompanyId();
  }

  diasRestantesLicencia(fila: ElementosDetail) {
    // calculo los dias restantes para caducar
    const fechaCaducidad = new Date(fila.caducity);
    const fechaHoy = new Date();
    const diaEnMilisegundos = 86400000;
    fila.restantes = Math.floor(
      Math.floor(fechaCaducidad.getTime() - fechaHoy.getTime()
      ) / diaEnMilisegundos);
    // pongo un alerta en rojo
    // si faltan menos de 30 dias para que caduque
    fila.badge = (fila.restantes > 30);

  }

  verificaLicenciaAsignada(fila) {
    // verifico si la licencia esta asignada
    fila.estado = (fila.userId == null)
      ? 0 : 1;
  }

  iconoSegunTipoLic(fila: ElementosDetail) {
    // verifico cambio de icono segun el tipo de licencia
    switch (fila.typeLicenseId) {
      case 1:
        fila.icono = Icons.ICON_LICENCE_NEW;
        break;
      case 2:
        fila.icono = Icons.ICON_LICENCE_SELECTOR;
        break;
      case 3:
        fila.icono = Icons.ICON_LICENCE_UFA;
        break;
      case 4:
        fila.icono = Icons.ICON_LICENCE_VIRTUAL_KEY;
        break;
    }
  }

  setGuionesLicenciasNoAsignadas(fila) {
    // coloco guiones en el listado
    // si no esta asignada la licencia
    fila.licEmail = (fila.estado === 0)
      ? '-' : fila.emailUser;
    fila.licMobile = (fila.estado === 0)
      ? '-' : fila.telUser;
  }

  openBottom(val): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        idSeccion: val,
        seleccionados: this.globales.licSele$.length,
        estado: this.globales.licSele$.map(
          function (a) {
            return a.estado;
          })[0],
        rol: this.auth.getUserRol()
      }
    });
  }

  openView(elemento): void {
    this.dialog.open(DialogModalComponent, {
      width: '520px',
      data: {
        position: elemento.Id,
        name: elemento.name,
        telephone: elemento.licMobile,
        email: elemento.licEmail,
        type: elemento.type,
        createdAt: elemento.createdAt,
        caducity: elemento.caducity,
        typeLicenseName: elemento.typeLicenseName,
        templateModal: 11,
      }
    });

  }


}
