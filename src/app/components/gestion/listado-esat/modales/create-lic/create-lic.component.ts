import {Observable} from 'rxjs';
import {EsatService} from '../../../../../services/esat.service';
import {Licencias} from '../../../../../classes/licencias';
import {TranslateService} from '@ngx-translate/core';
import {Snack} from '../../../../../classes/snackbar';
import {
  Globales,
  TipoElemento
} from '../../../../../classes/globales';
import {
  ContainerListadosComponent
} from '../../../container-listados/container-listados.component';
import {
  Component,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Constantes} from '../../../../../classes/constantes';

@Component({
  selector: 'app-create-lic',
  templateUrl: './create-lic.component.html',
  styleUrls: ['./create-lic.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class CreateLicComponent implements OnInit {

  options: any[] = [];
  filteredOptions: Observable<any>;
  dist: number;
  tipoLic: TipoElemento[];
  tipoSel: number;

  @ViewChild('tipo') tipo;
  @ViewChild('cantidad') cantidad;

  constructor(
    public dialogRef: MatDialogRef<CreateLicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public esatService: EsatService,
    private translate: TranslateService,
    public snackBar: Snack,
    public globales: Globales,
    public contlistados: ContainerListadosComponent
  ) {
  }

  ngOnInit() {
    this.tipoLic = this.globales.tipoElement$;
    this.tipoSel = 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(valor) {
    this.tipoSel = valor;
  }

  onLicenceAdd() {
    if (this.tipoSel === 0) {
      const mensaje =
        this.translate.instant('snack_seleccione_tipo');
      const accion =
        this.translate.instant('snack_deshacer');
      this.snackBar.openSnackBar(mensaje, accion);
    } else {
      const setLicencia = <Licencias>({
        cantidad: this.cantidad.nativeElement.value,
        idDist: Constantes.ID_MANUSA,
        idTipoLic: this.tipoSel
      });
      this.esatService.addLicence(setLicencia)
        .subscribe(data => {
          this.dialogRef.close();
          const mensaje =
            this.translate.instant('snack_creada');
          const accion =
            this.translate.instant('snack_deshacer');
          this.snackBar.openSnackBar(mensaje, accion);
          // actualizo el listado
          this.contlistados.getListados(this.globales.seccionId$);
        });
    }
  }
}

export interface TipoElemento {
  value: number;
  shortName: string;
  longName: string;
}

