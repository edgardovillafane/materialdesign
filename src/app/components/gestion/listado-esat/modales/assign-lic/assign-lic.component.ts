import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent,
  MatDialogRef
} from '@angular/material';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {EsatService} from '../../../../../services/esat.service';
import {TranslateService} from '@ngx-translate/core';
import {Snack} from '../../../../../classes/snackbar';
import {Globales} from '../../../../../classes/globales';
import {Icons} from '../../../../../classes/icons';
import {
  ContainerListadosComponent
} from '../../../container-listados/container-listados.component';
import {AuthService} from '../../../../../services/auth.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FileDatabase, FileFlatNode, FileNode, SidenavComponent} from '../../../sidenav/sidenav.component';
import {FlatTreeControl} from '@angular/cdk/tree';

/**
 * Assign Licence component
 *
 * This component has the content of Modal when click ACTIONS>ASSIGN Licence
 *
 * Assign a Licence o Group of licences to a Child Company.
 *
 */
@Component({
  selector: 'app-assign-lic',
  templateUrl: './assign-lic.component.html',
  styleUrls: ['./assign-lic.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class AssignLicComponent implements OnInit {

  myControl: FormControl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<any>;
  cli: number;
  items = this.globales.licSele$;
  arbolFlat: any;
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  dataChange: BehaviorSubject<FileNode[]> =
    new BehaviorSubject<FileNode[]>([]);


  @ViewChild('distribuidor') distribuidor: any;
  @ViewChild('cantidad') cantidad: any;

  /**
   *
   * @param dialogRef Injects Modal window module
   * @param data Injects the module to share data between a Modal and Component
   * @param esatService Injects the Service connecting to API
   * @param translate Injects the translation module
   * @param snackBar Injects the bottom message alerts
   * @param globales Get the shared between components global vars
   * @param contlistados Injects the component ContainerListadosComponent to use their methods
   * @param auth Injects the component AuthService to use their methods
   */
  constructor(
    public dialogRef: MatDialogRef<AssignLicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public esatService: EsatService,
    private translate: TranslateService,
    public snackBar: Snack,
    public globales: Globales,
    public contlistados: ContainerListadosComponent,
    public auth: AuthService,
    private tree: FileDatabase,
    private flat: SidenavComponent,
    database: FileDatabase
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.flat.transformer,
      this.flat._getLevel,
      this.flat._isExpandable,
      this.flat._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(
      this.flat._getLevel,
      this.flat._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener,
    );
    database.dataChange.subscribe(datos => {
      this.dataSource.data = datos;
      this.arbolFlat = this.dataSource._flattenedData.value;

    });
  }

  /**
   * Load the list of companies
   */
  ngOnInit() {
    // carga el listado de distribuidores
    this.filter('');
    console.log(this.globales.licSele$);
  }

  /**
   * Change the Client value when selected from list
   * @param event
   */
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.cli = event.option.value.id;
  }
  /**
   * Filter the companies list by new request to API in each input onKeyUp on machine search field.
   * @param val input value from search field. Method fired onKeyUp event
   */
  filter(val) {

    // carga el ARBOL
    const id_company = this.auth.getCompanyId();
    const nodoSel = this.globales.companyIdSelected$;
    this.esatService.getChilds(id_company, nodoSel).subscribe(arbol => {
      const data = this.tree.buildFileTree(arbol, 0);
      this.dataChange.next(data);
      this.dataSource.data = data;
      this.arbolFlat = this.dataSource._flattenedData.value;
      for (const nudo of this.arbolFlat) {

        this.options.push({id: nudo.id, name: nudo.filename});
      }

      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.options.slice())
        );

    });
  }

  private _filter(name: string): any {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  /**
   * Display the selected Company Name instead of Company ID
   * @param user
   */
  displayFn(user?: Dist): string | undefined {
    return user ? user.name : undefined;
  }
  getLicenseIcon(typeLicenseId: number) {
    let icono: string;
    // verifico icono segun el tipo de licencia
    switch (typeLicenseId) {
      case 1:
        icono =  Icons.ICON_LICENCE_NEW;
        break;
      case 2:
        icono = Icons.ICON_LICENCE_SELECTOR;
        break;
      case 3:
        icono = Icons.ICON_LICENCE_UFA;
        break;
      case 4:
        icono = Icons.ICON_LICENCE_VIRTUAL_KEY;
        break;
    }

    return icono;
  }

  /**
   * Close the dialog Modal
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /**
   * Get the id of a Licence or groups of licences and send the values to API for Update.
   * If API response OK, shows a Bottom message
   */
  onLicenceAss() {
    /**
     * Create the object for pass to API the Licence number to be assigned.
     * Send to API the Object and if APi response OK, show a bottom message and refresh the list
     */
    const sel = <Asignar>(
      {
        seleccionadas: this.globales.licSele$
          .map(function (a) {
            return a.id;
          }),
        cliente: this.cli
      }
    );
    this.esatService.assLicence(sel)
      .subscribe(data => {
        this.dialogRef.close();
        const mensaje = this.translate
          .instant('snack_asignada');
        const accion = this.translate
          .instant('snack_deshacer');
        this.snackBar.openSnackBar(mensaje, accion);
        // list reload
        this.contlistados.getListados(this.globales.seccionId$);
      });
  }
}

/**
 * Interface with Types of Object Distributor (Company)
 */
export interface Dist {
  id: number;
  name: string;
}
/**
 * Interface with Types of Object containing the array of IDs to send to API (Company)
 */
export interface Asignar {
  seleccionadas: any[];
  cliente: number;
}
