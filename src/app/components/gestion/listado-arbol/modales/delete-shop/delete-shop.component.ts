import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Globales} from '../../../../../classes/globales';
import {ArbolService} from '../../../../../services/arbol.service';
import {TranslateService} from '@ngx-translate/core';
import {Snack} from '../../../../../classes/snackbar';

@Component({
  selector: 'app-delete-shop',
  templateUrl: './delete-shop.component.html',
  styleUrls: ['./delete-shop.component.css']
})
export class DeleteShopComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteShopComponent>,
    public globales: Globales,
    public servicioArbol: ArbolService,
    public translate: TranslateService,
    public snackBar: Snack
  ) { }

  ngOnInit() {
  }
  onDeleteShop() {
    this.servicioArbol.deleteShop(this.globales.shopIdSelected$)
      .subscribe(data => {
        this.dialogRef.close();
        const mensaje = this.translate.instant('snack_cambios_guardados');
        const accion = this.translate.instant('snack_deshacer');
        this.snackBar.openSnackBar(mensaje, accion);
        this.globales.sideBack$ = false;
        // actualizo el sidenav
        setTimeout(() => this.globales.sideBack$ = true, 1000);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
