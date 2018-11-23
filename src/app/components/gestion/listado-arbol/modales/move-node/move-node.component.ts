import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AuthService} from '../../../../../services/auth.service';
import {EsatService} from '../../../../../services/esat.service';
import {Globales} from '../../../../../classes/globales';
import {FileDatabase, FileFlatNode, FileNode, SidenavComponent} from '../../../sidenav/sidenav.component';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatDialogRef} from '@angular/material';
import {ArbolService} from '../../../../../services/arbol.service';

/**
 * Component for move nodes along the tree . Update the parent Id and its role if necessary
 */
@Component({
  selector: 'app-move-node',
  templateUrl: './move-node.component.html',
  styleUrls:
    ['./move-node.component.css',
      '../../../container-listados/container-listados.component.css'],
})
export class MoveNodeComponent implements OnInit {
  isLinear = true;
  checkStep = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dataChange: BehaviorSubject<FileNode[]> =
    new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  nodoDestino$: any = {nombre: 'no seleccionado'};
  myControl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  arbolFlat: any;
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;

  /**
   *
   * @param _formBuilder
   * @param dialogRef
   * @param database
   * @param auth
   * @param esatService
   * @param arbolService
   * @param globales
   * @param tree
   * @param flat
   */
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MoveNodeComponent>,
    database: FileDatabase,
    private auth: AuthService,
    private esatService: EsatService,
    private arbolService: ArbolService,
    public globales: Globales,
    private tree: FileDatabase,
    private flat: SidenavComponent,
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
    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
      this.arbolFlat = this.dataSource._flattenedData.value;

    });
  }

  /**
   * Shows a three steps screen for help user to move nodes
   * Filter the selector by keyup event
   */
  ngOnInit() {
    // inicia el stepper
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({});

    // carga el ARBOL
    const id_company = this.auth.getCompanyId();
    const nodoSel = this.globales.companyIdSelected$;
    this.esatService.getChilds(id_company, nodoSel).subscribe(arbol => {
      const data = this.tree.buildFileTree(arbol, 0);
      this.dataChange.next(data);
      this.dataSource.data = data;
      this.arbolFlat = this.dataSource._flattenedData.value;
      for (const nudo of this.arbolFlat) {

        this.options.push({id: nudo.id, nombre: nudo.filename, rol: nudo.rol});
      }

      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.nombre),
          map(nombre => nombre ? this._filter(nombre) : this.options.slice())
        );

    });


  }

  /**
   * Filter by name the selection
   * @param nombre
   * @private
   */
  private _filter(nombre: string): any {
    const filterValue = nombre.toLowerCase();

    return this.options.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * show in screen the string value of a integer value selected in the select box
   * @param company
   */
  displayFn(company?: any): string | undefined {
    return company ? company.nombre : undefined;
  }

  /**
   * Set the destination where the node will be moved
   * @param nombre
   * @param id
   */
  selDestino(nombre, id) {
    this.nodoDestino$.nombre = nombre;
    this.nodoDestino$.id = id;
    this.checkStep = true;
  }

  /**
   * Call the api to UPDATE the database with the new location of the node through a Service.
   */
  onMoveNode() {
    const nodoSel = {
      nodo_sel: this.globales.companyIdSelected$,
      destino: this.nodoDestino$.id,
      id_company: this.auth.getCompanyId()
    };
    this.arbolService.moveNodo(nodoSel).subscribe(data => {
      // cierro la ventana
      this.dialogRef.close();
      // actualizo el arbol
      this.globales.sideBack$ = false;
      setTimeout(() =>
        this.globales.sideBack$ = true, 1000);
    });

  }

  /**
   * Close the modal
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}

