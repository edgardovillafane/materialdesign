import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
  MatDialog, MatPaginator, MatTableDataSource
} from '@angular/material';
import {Injectable} from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {UserService} from '../../../services/user.service';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Users} from '../../../model/users';
import {Globales} from '../../../classes/globales';
import {BottomSheetComponent} from '../../../classes/bottom-sheet';
import {DialogModalComponent} from '../../../classes/dialog-modal';
import {Paginas} from '../../../classes/paginas';
import {Listado} from '../../../request/listados';
import {Roles} from '../../../classes/roles';
import {LicenciasRed} from '../../../classes/licenciasred';

@Injectable()

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css',
    '../container-listados/container-listados.component.css']
})

export class ListadoUsuariosComponent implements OnInit {
  marcados: boolean;
  _totalRegistros: number;
  seleccionados: any[] = [];
  displayedColumns = ['check', 'nombre', 'apellido', 'telefono', 'email', 'rol', 'detalle'];
  myControl = new FormControl();
  filteredOptions: Observable<any>;
  dataSource = new MatTableDataSource<Listado>();
  options: any[] = [];
  @Output() emit = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('buscador') buscador: ElementRef;

  constructor(
    private translate: TranslateService,
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    public userService: UserService,
    public globales: Globales,
    public paginas: Paginas) {
    translate.setDefaultLang('en');
  }

  get totalRegistros(): number {
    return this._totalRegistros;
  }
  ngOnInit() {
    this.setListadoUsuarios();
    this.translate.use(this.globales.language$);
  }

  setListadoUsuarios() {
    const limite = this.paginas.getLimite(this.paginator.pageSize);
    const pagina = this.paginas.getPagina(this.paginator.pageIndex);
    const clave = this.paginas.getClave(this.buscador.nativeElement.value);
    const nodoSelId = this.globales.companyIdSelected$;
    // carga el listado de usuarios
    this.userService
      .getListadoUsers(
        nodoSelId, limite, pagina, clave)
      .subscribe(data => {
        this.dataSource.data = data.queryResult;
        this.setPagina(data.contador);
      });
  }

  setPagina(contador) {
    setTimeout(() => {
      this.paginator.length = contador;
      this._totalRegistros = contador;
    }, 200);
  }

  onSelCheckbox(elemento) {
    const usuario = <Users>({
      id: elemento.id,
      name: elemento.name,
      surname: elemento.surname,
      telephone: elemento.telephone,
      email: elemento.email,
      roleId: elemento.roleId
    });

    const index: number =
      this.seleccionados.findIndex(x => x.id === elemento.id);
    if (index !== -1) {
      this.seleccionados.splice(index, 1);
    } else {
      this.seleccionados.push(usuario);
    }
    console.log(this.seleccionados);
    // this.globales.licSele$ = this.seleccionados;
  }

  selAll(event) {
    if (event.checked) {
      this.dataSource.data.forEach(usuario => {
        this.marcados = true;
        this.seleccionados.push(usuario);
      });
    } else {
      this.seleccionados = [];
        this.marcados = false;
    }
  }

  filter(val) {
    this.userService.getBuscarUsuarios(val)
      .subscribe(datos => {
        this.options = datos;
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith<string>(''),
            map(name => name
              ? this.filter(name) : this.options.slice())
          );
      });
  }

  openBottom(val): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        idSeccion: val
      }
    });
  }

  getRoleName(roleId: string) {
    return this.globales.roles$.find(x => x.value === roleId.toString()).viewValue;
  }

  isAdmin(roleId: number) {
    switch (roleId) {
      case Roles.ROL_DOORWIFI:
      case Roles.ROL_MANUSA:
      case Roles.ROL_DISTRIBUIDOR_ADMIN:
      case Roles.ROL_SUBDISTRIBUIDOR_ADMIN:
      case Roles.ROL_CLIENTE_ADMIN:
        return true;
        break;
      case Roles.ROL_DISTRIBUIDOR_USER:
      case Roles.ROL_SUBDISTRIBUIDOR_USER:
      case Roles.ROL_CLIENTE_USER:
      case Roles.ROL_USUARIO_FINAL_ADMIN:
        return false;
        break;
    }
  }

  openView(element): void {
    this.dialog.open(DialogModalComponent, {
      width: '520px',
      data: {
        id: element.id,
        name: element.name,
        telephone: element.telephone,
        email: element.email,
        templateModal: 31,
      }
    });
  }
}


