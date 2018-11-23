import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {EsatService} from '../../../../../services/esat.service';
import {Diccionarios} from '../../../../../classes/diccionarios';
import {TranslateService} from '@ngx-translate/core';
import {BuscarMachine} from '../../../../../classes/machines';
import {Snack} from '../../../../../classes/snackbar';
/**
 * Assign Dictionary component
 *
 * This component has the content of Modal when click ACTIONS>ASSIGN DICTIONARY
 *
 * Assign a Dictionary to a Device.
 *
 */
@Component({
  selector: 'app-assign-dictio',
  templateUrl: './assign-dictio.component.html',
  styleUrls: ['./assign-dictio.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class AssignDictioComponent implements OnInit {
  licencias: any[] = [];
  myControl: FormControl = new FormControl();
  options: any[];
  body_diccionario: string;
  filteredOptions: Observable<any | BuscarMachine[]>;
  @ViewChild('dispositivo') dispositivo;
  @ViewChild('diccionario') diccionario;

  /**
   *
   * @param dialogRef injects Modal window module
   * @param data injects the module to share data between a Modal and Component
   * @param esatService injects the Service connecting to API
   * @param translate injects the translation module
   * @param snackBar injects the bottom message alerts
   *
   *
   */
  constructor(
    public dialogRef: MatDialogRef<AssignDictioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public esatService: EsatService,
    private translate: TranslateService,
    public snackBar: Snack
  ) {
    this.body_diccionario = '';
  }


  /**
   * load machines list and filter the list by pipe a observable
   */
  ngOnInit() {
    // load machines list and filter the list by pipe a observable
 /*   this.esatService.getMachines('').subscribe(datos => {
      this.options = datos;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith<string | BuscarMachine>(''),
          map(value => typeof value === 'string'
            ? value : value.distributionName),
          map(name => name
            ? this.filter(name) : this.options.slice())
        );
    });*/
  }

  /**
   * Filter the machines list by new request to API in each input onKeyUp on machine search field.
   * @param val input value from search field. Method fired onKeyUp event
   */
  filter(val) {
    // llamo al servicio con la query
   /* this.esatService.getMachines(val).subscribe(datos => {
      this.options = datos;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith<string | BuscarMachine>(''),
          map(value => typeof value === 'string'
            ? value : value.distributionName),
          map(name => name
            ? this.filter(name) : this.options.slice())
        );
    });*/

  }

  /**
   * Close the dialog Modal
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Get the form values and send the values to API for Update.
   * If API response OK, shows a Bottom message
   */
  /*onDiccionarioAdd() {
    const dispositivo = this.dispositivo.nativeElement.value;
    const diccionario = this.diccionario.nativeElement.value;
    this.esatService
      .addDiccionario({dispositivo, diccionario} as Diccionarios)
      .subscribe(data => {
        this.licencias.push(data);
        this.dialogRef.close();
        const mensaje = this.translate
          .instant('snack_diccionario');
        const accion = this.translate
          .instant('snack_deshacer');
        this.snackBar.openSnackBar(mensaje, accion);
      });
  }*/
}
