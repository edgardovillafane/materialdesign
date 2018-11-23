import {Component, OnInit, ViewChild} from '@angular/core';
import {DateAdapter, MatDialogRef} from '@angular/material';
import {Globales} from '../../../../../classes/globales';
import {Snack} from '../../../../../classes/snackbar';
import {TranslateService} from '@ngx-translate/core';
import {Elements} from '../../../../../classes/elementos';
import {EsatService} from '../../../../../services/esat.service';
import {
  ContainerListadosComponent
} from '../../../container-listados/container-listados.component';


export interface TipoLic {
  value: number;
  viewValue: string;
}

/**
 * Buy Licence Component
 *
 * This component manage the Modal when click ACTIONS>Buy Licence.
 *
 * By Select a Data Range, Select a Type of Licences and fill an Alias, insert in Database a new Licence to current Company
 */
@Component({
  selector: 'app-buy-licence',
  templateUrl: './buy-licence.component.html',
  styleUrls: ['./buy-licence.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class BuyLicenceComponent implements OnInit {
  /**
   * @property campo1 Form field CompanyId
   * @property campo4 Form field Date From
   * @property campo5 Form field Date Caducity
   */
  tiposLic: TipoLic[] = [
    {value: 1, viewValue: 'Nuevo'},
    {value: 2, viewValue: 'Selector'},
    {value: 3, viewValue: 'Permiso Usuario Final'},
    {value: 3, viewValue: 'Virtual Key'}
  ];
  selectedValue: number;
  element: Elements;
  @ViewChild('campo1') campo1;
  @ViewChild('campo2') campo2;
  @ViewChild('campo3') campo3;
  @ViewChild('campo4') campo4;
  @ViewChild('campo5') campo5;

  /**
   * @param dialogRef Injects Modal window module
   * @param esatService Injects the Service connecting to API
   * @param translate Injects the translation module
   * @param snackBar Injects the bottom message alerts
   * @param globales Get the shared between components global vars
   * @param contlistados Injects the component ContainerListadosComponent to use their methods
   * @param adapter Injects the date format adapter lo Locale




   */
  constructor(
    public dialogRef: MatDialogRef<BuyLicenceComponent>,
    public globales: Globales,
    private adapter: DateAdapter<any>,
    private snackBar: Snack,
    private translate: TranslateService,
    public esatService: EsatService,
    public contlistados: ContainerListadosComponent
  ) {
  }

  ngOnInit() {
    this.adapter.setLocale('es');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Method fired onClick in SEND button of Buy Licence Modal
   */
  onAddNewElement() {
    if (this.campo1.nativeElement.value === '') {
      this.showHintInvalidField();
    } else {
      this.fillObjectToSend();
      this.esatService.addNewElement(this.element)
        .subscribe(data => {
          this.dialogRef.close();
          this.showMessageOK();
          this.refreshList();
        });
    }
  }

  /**
   * Refresh the Licences List
   */
  refreshList() {
    this.contlistados.getListados(this.globales.seccionId$);
  }

  /**
   * Show a message if the field Alias is Empty
   */
  showHintInvalidField() {
    this.snackBar.openSnackBar(
      this.translate.instant('snack_ingrese_nombre'),
      this.translate.instant('snack_ok'));
  }

  /**
   * Fill the object element with form values
   */
  fillObjectToSend() {
    this.element = <Elements>({
      CompanyId: this.campo1.nativeElement.value,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      DateTimeCaducity: new Date(
        this.dateToCanonic(this.campo5.nativeElement.value)),
      DateTimeReasing: new Date(
        this.dateToCanonic(this.campo4.nativeElement.value)),
      name: this.campo2.nativeElement.value,
      type: this.selectedValue,
      OwnerId: 3
    });
  }

  /**
   * Show Message if the API response OK
   */
  showMessageOK() {
    const mensaje = this.translate
      .instant('snack_cambios_guardados');
    const accion = this.translate
      .instant('snack_ok');
    this.snackBar.openSnackBar(mensaje, accion);
  }

  /**
   * Converts date format to Canonic eg. 2018-10-03
   * @param fecha date in original format eg. 03/10/2018
   */
  dateToCanonic(fecha) {
    const fechaCan = fecha.split('/');
    return fechaCan[2] + '-' + fechaCan[1] + '-' + fechaCan[0];
  }
}
