import {
  Component, Inject, Injectable, OnInit, ViewChild
} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef, MatSnackBar
} from '@angular/material';
import {Globales} from '../../../../../classes/globales';
import {ArbolService} from '../../../../../services/arbol.service';
import {Companies} from '../../../../../classes/companies';
import {TranslateService} from '@ngx-translate/core';
import {FileDatabase} from '../../../sidenav/sidenav.component';

/**
 * Component for Editing the Node Data (company)
 */
@Injectable()
@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class EditNodeComponent implements OnInit {
  public datos: Companies;
  @ViewChild('campo1') campo1;
  @ViewChild('campo2') campo2;
  @ViewChild('campo3') campo3;
  @ViewChild('campo4') campo4;
  @ViewChild('campo5') campo5;


  constructor(
    public dialogRef: MatDialogRef<EditNodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public globales: Globales,
    public servicioArbol: ArbolService,
    public translate: TranslateService,
    public snackBar: MatSnackBar,
    public sidenav: FileDatabase,
  ) {
  }

  ngOnInit() {
    // carga los datos del nodo (company)
    this.servicioArbol.getNodo(
      this.globales.companyIdSelected$).subscribe(data => {
      this.datos = data;
    });
  }

  onEditNodo() {
    const company = <Companies>({
      id: this.datos.id,
      name: this.campo1.nativeElement.value,
      address: this.campo2.nativeElement.value,
      city: this.campo3.nativeElement.value,
      country: this.campo4.nativeElement.value,
      postalCode: this.campo5.nativeElement.value,
      parentId: this.datos.parentId,
      typeCompanyId: this.datos.typeCompanyId,
      latitude: this.datos.latitude,
      longitude: this.datos.longitude,
      createdAt: this.datos.createdAt,
      updatedAt: new Date(),
    });
    console.log(company);
    this.servicioArbol.editNodo(company)
      .subscribe(data => {
        this.dialogRef.close();
        const mensaje =
          this.translate.instant('snack_cambios_guardados');
        const accion =
          this.translate.instant('snack_deshacer');
        this.snackBar.open(mensaje, accion, {
          duration: 3000,
        });
        this.globales.sideBack$ = false;
        // actualizo el sidenav
        setTimeout(() =>
          this.globales.sideBack$ = true, 1000);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
