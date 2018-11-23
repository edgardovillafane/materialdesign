import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/**
 * Get the Data of tree
 */
@Component({
  selector: 'app-ver-detalle-tree',
  templateUrl: './ver-detalle-tree.component.html',
  styleUrls: ['./ver-detalle-tree.component.css', '../../../container-listados/container-listados.component.css']
})
export class VerDetalleTreeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VerDetalleTreeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
