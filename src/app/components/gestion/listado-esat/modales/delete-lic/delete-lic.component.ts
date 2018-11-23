import {Component, OnInit} from '@angular/core';
import {Globales} from '../../../../../classes/globales';
import {EsatService} from '../../../../../services/esat.service';
import {TranslateService} from '@ngx-translate/core';
import {Snack} from '../../../../../classes/snackbar';
import {
  ContainerListadosComponent
} from '../../../container-listados/container-listados.component';
import {MatDialogRef} from '@angular/material';

export interface Borrar {
  seleccionadas: any;
}

@Component({
  selector: 'app-delete-lic',
  templateUrl: './delete-lic.component.html',
  styleUrls: ['./delete-lic.component.css']
})
export class DeleteLicComponent implements OnInit {
  items = this.globales.licSele$;

  constructor(
    public dialogRef: MatDialogRef<DeleteLicComponent>,
    public esatService: EsatService,
    private translate: TranslateService,
    public snackBar: Snack,
    public globales: Globales,
    public contlistados: ContainerListadosComponent
  ) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /* metodo para borrar licencias */
  borrarLicencia(): void {
    // creo el objeto para pasar a la API
    // los numeros de licencia a borrar
    const seleccionadas = <Borrar>(
      {
        companyId: this.globales.companyIdSelected$,
        seleccionadas: this.globales.licSele$
          .map(function (a) {
            return a.id;
          })
      }
    );
    // envio el objeto con los id a la API
    this.esatService.borrarLicence(seleccionadas)
      .subscribe(licencia => {
        this.dialogRef.close();
        this.snackBar.openSnackBar(
          this.translate.instant('snack_borrada'),
          this.translate.instant('snack_deshacer'));
        // actualizo el listado
        this.contlistados.getListados(this.globales.seccionId$);
      });
  }
}




