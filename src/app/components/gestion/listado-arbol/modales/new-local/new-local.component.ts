import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ArbolService} from '../../../../../services/arbol.service';
import {TranslateService} from '@ngx-translate/core';
import {Shops} from '../../../../../classes/shops';
import {Snack} from '../../../../../classes/snackbar';
import {Globales} from '../../../../../classes/globales';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

/**
 * Insert a New Local in Database
 */
@Component({
  selector: 'app-new-local',
  templateUrl: './new-local.component.html',
  styleUrls: ['./new-local.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class NewLocalComponent implements OnInit {

  @ViewChild('campo0') campo0;
  @ViewChild('campo1') campo1;
  @ViewChild('campo2') campo2;
  @ViewChild('campo3') campo3;
  @ViewChild('campo4') campo4;
  @ViewChild('campo5') campo5;
  @ViewChild('campo6') campo6;
  @ViewChild('campo7') campo7;
  @ViewChild('campo8') campo8;

  datos: any[] = [];
  myControl: FormControl = new FormControl();
  options: Shops[];
  filteredOptions: Observable<Shops[]>;

  /**
   *
   * @param dialogRef
   * @param data
   * @param translate
   * @param arbolService
   * @param snackBar
   * @param globales
   */
  constructor(public dialogRef: MatDialogRef<NewLocalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public translate: TranslateService,
              public arbolService: ArbolService,
              public snackBar: Snack,
              public globales: Globales) {
  }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Call to Api if Form validates
   */
  onAddNewShop() {
    if (this.campo1.nativeElement.value === '') {
      this.snackBar.openSnackBar(
        this.translate.instant('snack_ingrese_nombre'),
        this.translate.instant('snack_ok'));
    } else {
      const shop = <Shops>({
        name: this.campo1.nativeElement.value,
        address: this.campo2.nativeElement.value,
        city: this.campo3.nativeElement.value,
        country: this.campo4.nativeElement.value,
        postalCode: this.campo5.nativeElement.value,
        CompanyId: this.campo0.nativeElement.value,
        latitude: 30,
        longitude: 20,
        createdAt: new Date(),
        updatedAt: new Date(),

      });
      this.arbolService.addNewShop(shop)
        .subscribe(data => {
          this.datos.push(data);
          this.dialogRef.close();
          const mensaje =
            this.translate.instant('snack_nuevo_local');
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

}
