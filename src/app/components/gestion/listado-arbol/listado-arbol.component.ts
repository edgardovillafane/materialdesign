import {
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
  MatTableDataSource
} from '@angular/material';
import {ArbolService} from '../../../services/arbol.service';
import {Machine} from '../../../classes/machines';
import {Observable} from 'rxjs';
import {Globales} from '../../../classes/globales';
import {BottomSheetComponent} from '../../../classes/bottom-sheet';
import {DialogModalComponent} from '../../../classes/dialog-modal';

/**
 * COMPONENT FOR SHOWING LIST OF DEVICES
 *
 * At right of SideNav, a list of devices with actions to do as Assign Dictionary, etc.
 */
@Injectable()

@Component({
  selector: 'app-listado-arbol',
  templateUrl: './listado-arbol.component.html',
  styleUrls: ['./listado-arbol.component.css',
    '../container-listados/container-listados.component.css']
})

export class ListadoArbolComponent implements OnInit {

  totalRegistros: number;
  @Output() emit = new EventEmitter();
  displayedColumns = [
    'check',
    'status',
    'dispositivo',
    'familia',
    'startup',
    'service',
    'propietario',
    'detalle'];
  filteredOptions: Observable<Machine[]>;
  dataSource = new MatTableDataSource<Machine>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('buscador') buscador: ElementRef;
  options: any[] = [];

  /**
   *
   * @param translate
   * @param bottomSheet
   * @param dialog
   * @param verListado
   * @param globales
   */
  constructor(
    public translate: TranslateService,
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    public verListado: ArbolService,
    public globales: Globales) {
    translate.setDefaultLang('en');
  }

  /**
   * Load the list of Devices for the selected company
   */
  ngOnInit() {
    this.setListadoMachine();
    this.translate.use(this.globales.language$);
  }

  /**
   * Set the initial paginator in 25 rows and go to first page and filter by name if needed.
   * Load the Devices list from Database through ArbolService Service
   * Get the page and total rows from API
   * Shows only rows not logically deleted
   */
  setListadoMachine() {
    const limit = (this.paginator.pageSize)
      ? this.paginator.pageSize : 25;
    const page = (this.paginator.pageIndex)
      ? this.paginator.pageIndex + 1 : 1;
    const clave = this.buscador.nativeElement.value;
    // carga el listado de usuarios de ARBOL
    this.verListado.getListadoMachines(
      this.globales.companyIdSelected$,
      this.globales.shopIdSelected$,
      limit, page, clave)
      .subscribe(data => {
        this.dataSource.data = data.queryResult;

        // actualizo el contador del paginador
        setTimeout(() => {
          this.paginator.length = data.contador;
          this.totalRegistros = data.contador;
        }, 250);
        // verifica el status
        for (const datum of this.dataSource.data) {
          const fila = datum;
          fila.status = (fila.deletedAt == null ) ? 'OK' : 'FAIL';
        }
      });
  }

  /**
   * Open the emergent bottom message dialog
   * @param val
   */
  openBottom(val): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        idSeccion: val
      }
    });
  }

  /**
   * Open the modal containig the form with Device Data
   * @param element
   */
  openView(element): void {
    this.dialog.open(DialogModalComponent, {
      width: '520px',
      data: {
        Id: element.Id,
        distributionName: element.nameForDistributionCompany,
        family: element.family,
        TypeDeviceId: element.TypeDeviceId,
        firmware_version: element.firmware_version,
        alarmas: element.alarmas,
        serial_number: element.serialNumber,
        status: element.status,
        templateModal: 21,
      }
    });
  }
}
