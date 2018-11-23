import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
  MatAutocompleteSelectedEvent, MatChipInputEvent
} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {UserService} from '../../../../../services/user.service';
import {Users} from '../../../../../classes/users';
import {TranslateService} from '@ngx-translate/core';
import {Invitaciones} from '../../../../../classes/invitaciones';
import {Snack} from '../../../../../classes/snackbar';

@Component({
  selector: 'app-send-inv',
  templateUrl: './send-inv.component.html',
  styleUrls: ['./send-inv.component.css',
    '../../../container-listados/container-listados.component.css']
})
export class SendInvComponent implements OnInit {

  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes = [ENTER, COMMA];
  myCtrl = new FormControl();
  filteredOptions: Observable<void | any>;
  emails = [];
  body_email = '' +
    '      Este es un texto de muestra del posible contenido\n' +
    '      del mensaje de invitacion para uso de\n' +
    '      ESAT de un Usuario nuevo\n' +
    '\n' +
    '      Estimado Juan:\n' +
    '      Te enviamos este mensaje para que comiences\n' +
    '      a utilizar tu licencia de ESAT n# 3574789\n' +
    '      otorgada por el administrador el dia 23/05/2018\n' +
    '\n' +
    '      Saludos';
  options: Users[] = [];
  invitaciones: any[] = [];

  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('texto') texto: any;

  constructor(
    public dialogRef: MatDialogRef<SendInvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private translate: TranslateService,
    public snackBar: Snack) {
  }

  ngOnInit() {
    // carga el listado de emails
    this.filter('');
  }

  /* handlers de matchip de emails seleccionados */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // agrega el email al array
    if ((value || '').trim()) {
      this.emails.push(value.trim());
    }
    // limpia el input value
    if (input) {
      input.value = '';
    }
    this.myCtrl.setValue(null);
  }

  // quita el email del array
  remove(email: any): void {
    const index = this.emails.indexOf(email);
    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.emails.push(event.option.viewValue);
    this.emailInput.nativeElement.value = '';
    this.myCtrl.setValue(null);
  }

  filter(nombre: string) {
    this.userService.getEmails(nombre).subscribe(datos => {
      this.options = datos;
      this.filteredOptions = this.myCtrl.valueChanges
        .pipe(
          startWith<string>(''),
          map(name => name
            ? this.filter(name) : this.options.slice())
        );
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSendInvitacion() {
    const email = this.emails;
    const texto = this.texto.nativeElement.value;
    this.userService
      .sendInvitaciones({email, texto} as Invitaciones)
      .subscribe(data => {
        this.invitaciones.push(data);
        this.dialogRef.close();
        this.snackBar.openSnackBar(
          this.translate.instant('snack_invitaciones'),
          this.translate.instant('snack_deshacer'));
      });
  }
}
