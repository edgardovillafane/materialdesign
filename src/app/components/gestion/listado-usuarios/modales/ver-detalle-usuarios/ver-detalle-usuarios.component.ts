import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-ver-detalle-usuarios',
  templateUrl: './ver-detalle-usuarios.component.html',
  styleUrls: ['./ver-detalle-usuarios.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class VerDetalleUsuariosComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VerDetalleUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
