import {
  Component, OnInit, Inject, ViewChild
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import {
  EsatService
} from '../../../../../services/esat.service';
import {UsuariosDetail} from '../../../../../classes/usuarios';
import {Snack} from '../../../../../classes/snackbar';
import {TranslateService} from '@ngx-translate/core';

export interface Historico {
  Id: number;
  fecha: string;
  tipo_mov: string;
  ElementId: number;
}

export interface Panel {
  Id: number;
  ElementId: string;
  instaladas: string;
  mantenidas: string;
  sinfallas: string;
}

@Component({
  selector: 'app-ver-detalle-esat',
  templateUrl: './ver-detalle-esat.component.html',
  styleUrls: ['./ver-detalle-esat.component.css',
    '../../../container-listados/container-listados.component.css']
})

export class VerDetalleEsatComponent implements OnInit {
  abre: boolean;
  iconoSel: any;
  historicos: Historico[] = [];
  // panelc: Panel[] = [];
  mantenidas: any;
  instaladas: any;
  sinfallas: any;
  datos: any[] = [];

  @ViewChild('campo1') campo1;
  @ViewChild('campo2') campo2;
  @ViewChild('campo3') campo3;
  @ViewChild('campo4') campo4;

  constructor(
    public dialogRef: MatDialogRef<VerDetalleEsatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public esatService: EsatService,
    private translate: TranslateService,
    public snack: Snack) {
  }

  edit() {
    /*cambia el icono lapiz por disquete*/
    this.iconoSel = (!this.abre) ? 'edit' : 'save';
    /* desbloquea los campos de formulario para ser
     editados = si cerrados los abre,
     si abiertos, los cierra*/
    this.abre = (!this.abre);

    /* envia los datos editados a la api
     si se clica en el disquet*/
    if (this.abre) {
      const alias = this.campo1.nativeElement.value;
      const telephone = this.campo2.nativeElement.value;
      const email = this.campo3.nativeElement.value;
      const licence_type = this.campo4.nativeElement.value;

     /* this.esatService.editUserDetail({
        alias, telephone, email, licence_type
      } as UsuariosDetail)
        .subscribe(data => {
          this.datos.push(data);
          console.log(this.datos);
          const mensaje = this.translate
            .instant('snack_cambios_guardados');
          const accion = this.translate
            .instant('snack_deshacer');
          this.snack.openSnackBar(mensaje, accion);
        });*/
    }
  }

  ngOnInit() {
    this.abre = true;
    this.iconoSel = 'edit';
    // carga el listado Historico de asignaciones
   /* this.esatService.getHistorico().subscribe(data => {
      this.historicos = data;
    });*/
    /*harcoding de paneles informativos*/
    this.instaladas = 400;
    this.mantenidas = 250;
    this.sinfallas = 50;
    /* carga los tres paneles informativos
        this.esatService.getPaneles().subscribe(data => {
          this.panelc = data;
          for (let panel of this.panelc) {
            this.instaladas = panel.instaladas;
            this.mantenidas = panel.mantenidas;
            this.sinfallas = panel.sinfallas;
          }
        });
    */
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}




