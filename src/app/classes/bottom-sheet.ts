import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog} from '@angular/material';
import {Component, Inject, Injectable} from '@angular/core';
import {DialogModalComponent} from './dialog-modal';
import {Globales} from './globales';
import {TranslateService} from '@ngx-translate/core';
import {Snack} from './snackbar';
import {AuthService} from '../services/auth.service';
import {TypeCompanies} from './type-companies';
import {Roles} from './roles';

@Injectable()
@Component({
  selector: 'app-bottom-sheet-usuarios',
  templateUrl:
    '../components/gestion/container-listados/acciones.html',
})
export class BottomSheetComponent {
  idNodo: number;
  autorizado = true;

  // USER ROLES
  U_DWF = Roles.ROL_DOORWIFI;
  U_MAN = Roles.ROL_MANUSA;
  U_DIA = Roles.ROL_DISTRIBUIDOR_ADMIN;
  U_SDA = Roles.ROL_SUBDISTRIBUIDOR_ADMIN;
  U_CLI = Roles.ROL_CLIENTE_ADMIN;
  U_UFA = Roles.ROL_USUARIO_FINAL_ADMIN;

  // TYPE OF COMPANY
  C_DWF = TypeCompanies.TYPE_SYSTEMADMIN;
  C_MAN = TypeCompanies.TYPE_MANUSAADMIN;
  C_DIA = TypeCompanies.TYPE_DISTRIBUTOR;
  C_SDA = TypeCompanies.TYPE_SUBDISTRIBUTOR;
  C_CLI = TypeCompanies.TYPE_CLIENT;


  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    public dialog: MatDialog,
    public auth: AuthService,
    public globales: Globales,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private translate: TranslateService,
    public snackBar: Snack) {
  }
  isShop() {
    if (this.globales.shopIdSelected$ != null) {
    return true; }
  }
  openDialog(modal): void {
    this.bottomSheetRef.dismiss();
    // verifica si hay alguna licencia seleccionada
    if (this.globales.licSele$.length === 0 && modal === 13) {
      const mensaje =
        this.translate.instant('snack_seleccione_una_licencia');
      const accion = this.translate.instant('snack_deshacer');
      this.snackBar.openSnackBar(mensaje, accion);

    } else if (this.globales.licSele$.length > 1 && modal === 12) {
      const mensaje =
        this.translate.instant('snack_seleccione_solo_una_licencia');
      const accion =
        this.translate.instant('snack_deshacer');
      this.snackBar.openSnackBar(mensaje, accion);

    } else {

      this.idNodo = 1;
      const dialogRef = this.dialog.open(
        DialogModalComponent,
        {
          width: (() => modal === 1) ? '760px' : '420px',
          data: {idNodo: this.idNodo, templateModal: modal}
        });

      dialogRef.afterClosed().subscribe(result => {

        this.idNodo = result;
      });
    }


  }

}
