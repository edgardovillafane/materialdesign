import {Component, OnInit} from '@angular/core';
import {Globales} from '../../../../../classes/globales';
import {EsatService} from '../../../../../services/esat.service';
import {TranslateService} from '@ngx-translate/core';
import {Snack} from '../../../../../classes/snackbar';
import {
  ContainerListadosComponent
} from '../../../container-listados/container-listados.component';
import {MatDialogRef} from '@angular/material';

export interface Seleccion {
  seleccionadas: any;
}

@Component({
  selector: 'app-renew-lic',
  templateUrl: './renew-lic.component.html',
  styleUrls: ['./renew-lic.component.css']
})
export class RenewLicComponent implements OnInit {
  items = this.globales.licSele$;

  constructor(
    public dialogRef: MatDialogRef<RenewLicComponent>,
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

  /* metodo para renovar licencias */
  renovarLicencia(): void {
    // creo el objeto para pasar a la API los
    // numeros de licencia a renovar
    const seleccionadas = <Seleccion>(
      {
        companyId: this.globales.companyIdSelected$,
        seleccionadas: this.globales.licSele$
          .map(function (a) {
            return a.id;
          })
      }
    );
    // envio el objeto con los id a la API
    this.esatService.renovarLicence(seleccionadas)
      .subscribe(licencia => {
        this.dialogRef.close();
        this.snackBar.openSnackBar(
          this.translate.instant('snack_renovada'),
          this.translate.instant('snack_deshacer'));
        // actualizo el listado
        this.contlistados.getListados(this.globales.seccionId$);
      });
  }
}




