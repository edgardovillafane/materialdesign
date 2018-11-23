import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EsatService} from '../../../../../services/esat.service';
import {TranslateService} from '@ngx-translate/core';
import {Globales} from '../../../../../classes/globales';
import {Snack} from '../../../../../classes/snackbar';
import {
  ContainerListadosComponent
} from '../../../container-listados/container-listados.component';

export interface Revocar {
  companyId: number;
  asignada: number[];
  noasignada: number[];
}

@Component({
  selector: 'app-revoke-lic',
  templateUrl: './revoke-lic.component.html',
  styleUrls: ['./revoke-lic.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class RevokeLicComponent implements OnInit {

  checkAsignada: boolean;
  checkNoasignada: boolean;

  constructor(
    public dialogRef: MatDialogRef<RevokeLicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public esatService: EsatService,
    private translate: TranslateService,
    public snackBar: Snack,
    public globales: Globales,
    public contlistados: ContainerListadosComponent
  ) {
    this.checkAsignada = true;
    this.checkNoasignada = true;
  }

  itemAsig = this.globales.licSele$
    .filter(function (licencia) {
      return licencia.estado === 1;
    });
  itemNoAsig = this.globales.licSele$
    .filter(function (licencia) {
      return licencia.estado === 0;
    });

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /* metodo para revocar licencias */
  revocarLicencia(): void {
    // obtengo los numeros de id de las
    // licencias asignadas checkeadas
    const conjAsignada = (this.checkAsignada)
      ? this.itemAsig
        .map(function (licencia) {
          return licencia.id;
        })
      : [];
    // obtengo los numeros de id de las
    // licencias NO asignadas checkeadas
    const conjNoasignada = (this.checkNoasignada)
      ? this.itemNoAsig.map(function (licencia) {
        return licencia.id;
      })
      : [];
    // creo el objeto para pasar a la API
    // ambos conjuntos de ID (asignadas y no asignadas)
    const revocar = <Revocar>(
      {
        companyId: this.globales.companyIdSelected$,
        asignada: conjAsignada,
        noasignada: conjNoasignada
      });
    // verifico que haya por lo menos un checkbox
    // seleccionado para enviar a la API
    if (!this.checkAsignada && !this.checkNoasignada) {
      this.snackBar.openSnackBar(
        this.translate.instant('snack_sin_seleccion'),
        this.translate.instant('snack_deshacer')
      );
    } else {
      // envio el objeto con los id a la API
      this.esatService.revokeLicence(revocar)
        .subscribe(licencia => {
          this.dialogRef.close();
          this.snackBar.openSnackBar(
            this.translate.instant('snack_revocada'),
            this.translate.instant('snack_deshacer'));
          // actualizo el listado
          this.contlistados.getListados(this.globales.seccionId$);
        });
    }
  }
}



