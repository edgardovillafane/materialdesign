import {Component, OnInit} from '@angular/core';
import {Globales} from '../../../../../classes/globales';
import {ArbolService} from '../../../../../services/arbol.service';
import {TranslateService} from '@ngx-translate/core';
import {Snack} from '../../../../../classes/snackbar';
import {MatDialogRef} from '@angular/material';

/**
 * Component only available for System Admin
 */
@Component({
  selector: 'app-delete-node',
  templateUrl: './delete-node.component.html',
  styleUrls: ['./delete-node.component.css']
})

export class DeleteNodeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteNodeComponent>,
    public globales: Globales,
    public servicioArbol: ArbolService,
    public translate: TranslateService,
    public snackBar: Snack
  ) {
  }

  ngOnInit() {
  }

  onDeleteNodo() {
    this.servicioArbol.deleteNodo(this.globales.companyIdSelected$)
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
