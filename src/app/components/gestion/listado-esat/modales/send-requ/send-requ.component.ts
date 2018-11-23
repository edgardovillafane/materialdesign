import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {EsatService} from '../../../../../services/esat.service';
import {Invitaciones} from '../../../../../classes/invitaciones';
import {TranslateService} from '@ngx-translate/core';
import {Snack} from '../../../../../classes/snackbar';
import {Globales} from '../../../../../classes/globales';
import {
  ContainerListadosComponent
} from '../../../container-listados/container-listados.component';


@Component({
  selector: 'app-send-requ',
  templateUrl: './send-requ.component.html',
  styleUrls: ['./send-requ.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class SendRequComponent implements OnInit {

  myCtrl = new FormControl();
  filteredOptions: Observable<void | any>;
  options: any[] = [];
  licenciaId: any;
  body_email: string;

  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('texto') texto: any;
  @ViewChild('email') email: any;

  constructor(
    public dialogRef: MatDialogRef<SendRequComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public esatService: EsatService,
    private translate: TranslateService,
    public globales: Globales,
    public snackBar: Snack,
    public contlistados: ContainerListadosComponent) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // carga el listado de emails
    // this.filter('');
    this.licenciaId = this.globales.licSele$
      .map(function (a) {
        return a.id;
      });
    this.body_email = this.translate.instant('body_invitacion');
    const obs = fromEvent(this.email.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(500)
      );
    obs.subscribe(() => this.filter( this.email.nativeElement.value ));
  }



  onSendInvitacion() {
    const email = this.email.nativeElement.value;
    const texto = this.texto.nativeElement.value;
    const licenciaId: number = this.licenciaId[0];
    const companyId: number = this.globales.companyIdSelected$;
    this.esatService.sendInvitaciones(
      {email, texto, licenciaId, companyId} as
        Invitaciones)
      .subscribe(data => {
        this.dialogRef.close();
        const mensaje = this.translate
          .instant('snack_invitaciones');
        const accion = this.translate
          .instant('snack_deshacer');
        this.snackBar.openSnackBar(mensaje, accion);
        // actualizo el listado
        this.contlistados
          .getListados(this.globales.seccionId$);
      });

  }

  filter(nombre) {

    this.esatService.getEmails(nombre)
      .subscribe(datos => {
        this.options = datos;
        this.filteredOptions = this.myCtrl.valueChanges
          .pipe(
            startWith<string>(''),
            map(name => name
              ? this.filter(name) : this.options.slice())
          );
      });
  }
}

