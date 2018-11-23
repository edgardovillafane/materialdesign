import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Companies} from '../../../../../classes/companies';
import {ArbolService} from '../../../../../services/arbol.service';
import {TranslateService} from '@ngx-translate/core';
import {Globales} from '../../../../../classes/globales';
import {Snack} from '../../../../../classes/snackbar';
import {Constantes} from '../../../../../classes/constantes';

/**
 * Insert a New Distributor in Database
 */
@Component({
  selector: 'app-new-dist',
  templateUrl: './new-dist.component.html',
  styleUrls: ['./new-dist.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class NewDistComponent implements OnInit {

  @ViewChild('campo1') campo1;
  @ViewChild('campo2') campo2;
  @ViewChild('campo3') campo3;
  @ViewChild('campo4') campo4;
  @ViewChild('campo5') campo5;
  @ViewChild('campo6') campo6;
  @ViewChild('campo7') campo7;
  @ViewChild('campo8') campo8;
  @ViewChild('campo9') campo9;

  datos: any[] = [];

  /**
   *
   * @param dialogRef
   * @param data
   * @param translate
   * @param esatService
   * @param snackBar
   * @param globales
   */
  constructor(public dialogRef: MatDialogRef<NewDistComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public translate: TranslateService,
              public esatService: ArbolService,
              public snackBar: Snack,
              public globales: Globales) {
  }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddNewDist() {
    const company = <Companies>({
      name: this.campo1.nativeElement.value,
      address: this.campo2.nativeElement.value,
      city: this.campo3.nativeElement.value,
      country: this.campo4.nativeElement.value,
      postalCode: this.campo5.nativeElement.value,
      parentId: Constantes.ID_MANUSA,
      typeCompanyId: Constantes.ROL_DISTRIBUIDOR,
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });


    this.esatService.addNewDist(company)
      .subscribe(data => {
        this.datos.push(data);
        const mensaje =
          this.translate.instant('snack_nuevo_dist');
        const accion =
          this.translate.instant('snack_deshacer');
        this.snackBar.openSnackBar(mensaje, accion);
        // cierro la modal
        this.dialogRef.close();
        this.globales.sideBack$ = false;
        // actualizo el sidenav
        setTimeout(() =>
          this.globales.sideBack$ = true, 1000);
      });

  }

}
