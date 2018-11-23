import {FlatTreeControl} from '@angular/cdk/tree';
import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import {
  BehaviorSubject, fromEvent,
  Observable,
  of as observableOf
} from 'rxjs';
import {EsatService} from '../../../services/esat.service';
import {Globales} from '../../../classes/globales';
import {ContainerListadosComponent} from '../container-listados/container-listados.component';
import {DataSharingService} from '../../../services/data-sharing.service';
import {BottomSheetComponent} from '../../../classes/bottom-sheet';
import {MatBottomSheet} from '@angular/material';
import {AuthService} from '../../../services/auth.service';
import {debounceTime, map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {TypeCompanies} from '../../../classes/type-companies';
import {Icons} from '../../../classes/icons';


export class FileNode {
  children: FileNode[];
  filename: string;
  id: number;
  parentId: number;
  typeCompanyId: number;
}


export class FileFlatNode {
  id: number;
  filename: string;
  level: number;
  expandable: boolean;
  parentId: number;
  typeCompanyId: number;

}

/**
 * SIDENAV COMPONENT
 */
@Injectable()
export class FileDatabase {
  @Input() expandAll = true;
  dataChange: BehaviorSubject<FileNode[]> =
    new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  constructor(
    public verListado: EsatService,
    public globales: Globales,
    private auth: AuthService) {
    this.initialize();
  }

  initialize() {
    // carga el ARBOL
    const id_company = this.auth.getCompanyId();
    this.verListado.getArbol(id_company).subscribe(arbol => {
      const data = this.buildFileTree(arbol, 0);
      this.dataChange.next(data);
    });
  }


  buildFileTree(value: any, level: number): FileNode[] {
    const data: any[] = [];

    // Si array
    if (value instanceof Array) {
      for (const k in value) {
        if (value.hasOwnProperty(k)) {
          const node = new FileNode();
          const v = value[k];
          node.filename = `${v.name}`;
          node.id = v.id;
          node.typeCompanyId = v.typeCompanyId;
          node.parentId = v.parentId != null ? v.parentId : v.companyId;
          if (v.shops != null
            && (v.shops.length > 0)) {
            if (node.children != null) {
              node.children = node.children.concat(this.buildFileTree(
                v.shops,
                level + 1));
            } else {
              node.children = this.buildFileTree(
                v.shops,
                level + 1);
            }
          }
          if (v.childs != null
            && (v.childs instanceof Array && v.childs.length > 0)) {
            if (node.children != null) {
              node.children = node.children.concat(this.buildFileTree(
                v.childs, level + 1));
            } else {
              node.children = this.buildFileTree(
                v.childs, level + 1);
            }
          }

          data.push(node);
        }
      }
    } else {
      if (value) {
        const node = new FileNode();
        node.filename = `${value.name}`;
        node.id = value.id;
        node.typeCompanyId = value.typeCompanyId;
        node.parentId = value.parentId != null ? value.parentId : value.companyId;
        if (value.shops != null
          && (value.shops.length > 0)) {
          if (node.children != null) {
            node.children = node.children.concat(this.buildFileTree(
              value.shops,
              level + 1));
          } else {
            node.children = this.buildFileTree(
              value.shops,
              level + 1);
          }
        }
        if (value.childs != null
          && (value.childs instanceof Array && value.childs.length > 0)) {
          if (node.children != null) {
            node.children = node.children.concat(this.buildFileTree(
              value.childs, level + 1));
          } else {
            node.children = this.buildFileTree(
              value.childs, level + 1);
          }
        }

        data.push(node);
      }
    }

    return data;
  }

}

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
  providers: [FileDatabase]
})

export class SidenavComponent implements OnInit, AfterViewInit {
  @Output() emitEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('tree') tree;
  @ViewChild('search') search: ElementRef;
  clicked: any;
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  nudo: any = [];
  arbolFlat: any;
  arbolFull: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  breadcrumb: string[] = [];
  nodos: any[] = [];
  nodesFiltered: any = [];
  myControl = new FormControl();
  mySearchNode = new FormControl();
  valueSearchTree = '';
  constructor(
    database: FileDatabase,
    private contlistados: ContainerListadosComponent,
    private dataSharingService: DataSharingService,
    private globales: Globales,
    private bottomSheet: MatBottomSheet,
    private auth: AuthService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(
      this._getLevel,
      this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener,
    );
    this.arbolFull = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener,
    );
    this.treeControl.expandAll();
    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
      this.arbolFlat = this.dataSource._flattenedData.value;
      this.arbolFull.data = data;
      // arbol flat
      for (const nudo of this.arbolFlat) {
        this.nodos.push({id: nudo.id, nombre: nudo.filename, typeCompanyId: nudo.typeCompanyId, parentId: nudo.parentId});
      }
      const initialNode: FileFlatNode = new FileFlatNode();
      initialNode.filename = this.auth.getCompanyName();
      initialNode.id = this.auth.getCompanyId();
      initialNode.parentId = 0;
      initialNode.level = 0;
      initialNode.typeCompanyId = this.auth.getCompanyTypeId();

      this.onSelNode(initialNode);
    });
  }

  ngAfterViewInit() {
    this.treeControl.expandAll();

  }

  ngOnInit() {
    this.treeControl.expandAll();
    const obs = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(500)
      );
    obs.subscribe(() => this.setFiltrarNodo(this.search.nativeElement.value));

  }

  setFiltrarNodo(valor) {
    this.nodesFiltered = [];
    this.treeControl.expandAll();
    // obtengo un array con todos los nodos que contienen la palabra clave
    for (const nudo of this.nodos) {
      if (nudo.nombre.toLowerCase().indexOf(valor.toLowerCase()) >= 0) {
        if (!this.nodesFiltered.includes(nudo.id)) {
          this.nodesFiltered.push(nudo.id);
          this.addAllParents(nudo.id);
          this.addAllChilds(nudo.id);
        }
      }
    }
    // Construyo un nuevo arbol solo con los nodos seleccionados
    if (valor != null) {
      this.dataSource.data = this.filterTreeWithSearchQuery(this.arbolFull.data, 0, valor);
    } else {
      this.dataSource.data = this.arbolFull.data;
    }

    this.treeControl.expandAll();

  }

  addAllParents(nudoId) {

    // busco todos los padres de forma recursiva
    for (const nudo of this.nodos) {
      if (nudo.id === nudoId) {
        if (!this.nodesFiltered.includes(nudo.parentId)) {
          this.nodesFiltered.push(nudo.parentId);
          if (nudo.parentId !== 0) {
            this.addAllParents(nudo.parentId);
          }
        }
      }
    }
  }

  addAllChilds(nudoId) {
    // busco todos los hijos de forma recursiva
    for (const nudo of this.nodos) {
      if (nudo.parentId === nudoId) {
        if (!this.nodesFiltered.includes(nudo.id)) {
          this.nodesFiltered.push(nudo.id);
          this.addAllChilds(nudo.id);
        }
      }
    }
  }

  filterTreeWithSearchQuery(value: FileNode[], level: number, query: string): FileNode[] {
    const data: FileNode[] = [];

    for (const k in value) {
      if (value.hasOwnProperty(k)) {
        const newNode: FileNode = new FileNode();
        const node: FileNode = value[k];

        newNode.filename = node.filename.replace(new RegExp(query, 'gi'), match => {
          return '<u>' + match + '</u>';
        });
        newNode.id = node.id;
        newNode.typeCompanyId = node.typeCompanyId;
        newNode.parentId = node.parentId;
        if (node.children != null
          && (node.children instanceof Array && node.children.length > 0)) {
          newNode.children = this.filterTreeWithSearchQuery(
            node.children, level + 1, query);
        }
        if (this.nodesFiltered.includes(node.id)) {
          data.push(newNode);
        }
      }
    }
    return data;
  }

  nodeIsActive(node: FileFlatNode) {
    if (this.globales.shopIdSelected$ != null) {
      return node.id === this.globales.shopIdSelected$ && node.typeCompanyId == null;
    } else {
      return node.id === this.globales.companyIdSelected$ && node.typeCompanyId != null;
    }
  }

  displayFn(nodo?: any): string | undefined {
    return nodo ? nodo.nombre : undefined;
  }

  transformer = (node: FileNode, level: number) => {
    const flatNode = new FileFlatNode();
    flatNode.id = node.id;
    flatNode.filename = node.filename;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    flatNode.typeCompanyId = node.typeCompanyId;
    flatNode.parentId = node.parentId;
    return flatNode;
  }

  public _getLevel = (node: FileFlatNode) => {
    return node.level;
  }

  public _isExpandable = (node: FileFlatNode) => {
    return node.expandable;
  }

  public _getChildren = (node: FileNode): Observable<FileNode[]> => {
    return observableOf(node.children);
  }

  hasChild = (_: number, _nodeData: FileFlatNode) => {
    return _nodeData.expandable;
  }

  getIcon(typeCompanyId) {
    let matIcon: string;
    switch (typeCompanyId) {
      case TypeCompanies.TYPE_SYSTEMADMIN:
      case TypeCompanies.TYPE_MANUSAADMIN:
      case TypeCompanies.TYPE_DISTRIBUTOR:
        matIcon = Icons.ICON_DISTRIBUTOR;
        break;
      case TypeCompanies.TYPE_CLIENT:
        matIcon = Icons.ICON_CLIENT;
        break;
      case undefined:
        matIcon = Icons.ICON_SHOP;
        break;
    }
    return matIcon;

  }


  /* Breadcrumb */

  onSelNode(node: FileFlatNode) {
    if (node.typeCompanyId == null) {
      this.globales.companyIdSelected$ = node.parentId;
      this.globales.shopIdSelected$ = node.id;
      this.globales.shopNameSelected$ = this.removeHtmlCode(node.filename);
      this.globales.companyNameSelected$ = null;
    } else {
      this.globales.companyIdSelected$ = node.id;
      this.globales.shopIdSelected$ = null;
      this.globales.companyNameSelected$ = this.removeHtmlCode(node.filename);
      this.globales.shopNameSelected$ = null;
    }
    // TODO:
    this.globales.nodoSelLevel$ = node.level;
    this.clicked = node.filename;
    this.emitEvent.emit(this.buildBreadcrumd(node.parentId, node.level, this.removeHtmlCode(node.filename)));

  }

  removeHtmlCode(string) {
    return string.replace(/<\/?[^>]+(>|$)/g, '');
  }

  /* selecciono recursivamente el parent Id para obtener el camino de hormiga*/
  buildBreadcrumd(parentId, level, nodo) {
    this.breadcrumb = []; // limpio el camino de hormigas anterior
    this.nudo[0] = parentId; // Le asigno al nodo raiz el parentId
    if (this.arbolFlat.length > 0) {
      this.breadcrumb.push(nodo); // agrego al array el nombre del nodo seleccionado

      if (level > 0) {
        // dependiendo el nivel, se generan de 1 a 4 elementos para mostrar en el camino
        for (let x = 1; x <= level; x++) {
          this.obtenerNodoPadre(x);
          this.agregarElementoAlBreadcrumb(x);
        }
      }
      return this.invertirOrdenBreadcrumb();
    }
  }

  obtenerNodoPadre(x) {
    // obtengo el nodo padre del seleccionado y lo guardo en un array
    this.nudo[x] = this.arbolFlat.find(obj => obj.id === this.getParentId(x) && obj.typeCompanyId != null);
  }

  getParentId(x) {
    return (x === 1) ? this.nudo[0] : this.nudo[x - 1].parentId;
  }

  agregarElementoAlBreadcrumb(x) {
    // agrego el nodo encontrado con find al array
    this.breadcrumb.push(this.nudo[x].filename);
  }

  invertirOrdenBreadcrumb() {
    // invierto el array para mostrar el camino y le agrego los chevrones
    return this.breadcrumb.reverse().join(' > ');
  }

  openBottom(val): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        idSeccion: val,
        level: this.globales.nodoSelLevel$
      }
    });
  }

}
