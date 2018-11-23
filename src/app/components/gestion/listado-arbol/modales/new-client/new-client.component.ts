import {
  Component,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {
  ArbolService
} from '../../../../../services/arbol.service';
import {Snack} from '../../../../../classes/snackbar';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Companies} from '../../../../../classes/companies';
import {Globales} from '../../../../../classes/globales';
import {Constantes} from '../../../../../classes/constantes';

/**
 * Insert a New User in Database
 */
@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls:
    ['./new-client.component.css',
      '../../../container-listados/container-listados.component.css']
})
export class NewClientComponent implements OnInit {
  @ViewChild('campo0') campo0;
  @ViewChild('campo1') campo1;
  @ViewChild('campo2') campo2;
  @ViewChild('campo3') campo3;
  @ViewChild('campo4') campo4;
  @ViewChild('campo5') campo5;

  datos: any[] = [];
  myControl: FormControl = new FormControl();
  options: Companies[];
  filteredOptions: Observable<Companies[]>;

  /**
   *
   * @param dialogRef
   * @param data
   * @param translate
   * @param arbolService
   * @param snackBar
   * @param globales
   */
  constructor(public dialogRef: MatDialogRef<NewClientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public translate: TranslateService,
              public arbolService: ArbolService,
              public snackBar: Snack,
              public globales: Globales) {
  }

  ngOnInit() {
    this.filter();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Validates the values and call the API if valid
   */
  onAddNewCompany() {
    if (this.campo1.nativeElement.value === '') {
      this.snackBar.openSnackBar(
        this.translate.instant('snack_ingrese_nombre'),
        this.translate.instant('snack_ok'));

    } else {

      const company = <Companies>({
        name: this.campo1.nativeElement.value,
        address: this.campo2.nativeElement.value,
        city: this.campo3.nativeElement.value,
        country: this.campo4.nativeElement.value,
        postalCode: this.campo5.nativeElement.value,
        typeCompanyId: Constantes.ROL_CLIENTE,
        parentId: this.campo0.nativeElement.value,
        latitude: 30,
        longitude: 20,
        createdAt: new Date(),
        updatedAt: new Date(),

      });

      this.arbolService.addNewDist(company)
        .subscribe(data => {
          this.datos.push(data);
          this.dialogRef.close();
          const mensaje =
            this.translate.instant('snack_nuevo_cliente');
          const accion =
            this.translate.instant('snack_deshacer');
          this.snackBar.openSnackBar(mensaje, accion);
          this.globales.sideBack$ = false;
          // actualizo el sidenav
          setTimeout(() =>
            this.globales.sideBack$ = true, 1000);
        });
    }

  }

  /**
   * Load the list of Distributors from Database
   */
  filter() {
    this.arbolService.getListadoDistribuidores(
      Constantes.ROL_DISTRIBUIDOR, 0).subscribe(
      datos => {
        this.options = datos;
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith<string | Companies>(''),
            map(value =>
              typeof value === 'string' ? value : value.name),
            map(name =>
              name ? this._filter(name) : this.options.slice())
          );

      });

  }

  displayFn(user?: Companies): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Companies[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      option =>
        option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
