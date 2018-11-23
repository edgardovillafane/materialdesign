import {
  Component, ElementRef, Inject, OnInit, ViewChild
} from '@angular/core';
import {Companies} from '../../../../../classes/companies';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {Snack} from '../../../../../classes/snackbar';
import {Globales} from '../../../../../classes/globales';
import {Users} from '../../../../../model/users';
import {UserService} from '../../../../../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  @ViewChild('campo0') campo0: any;
  @ViewChild('campo1') campo1: any;
  @ViewChild('campo2') campo2: any;
  @ViewChild('campo3') campo3: any;
  @ViewChild('campo4') campo4: ElementRef;
  roles: any[];
  datos: any[] = [];
  options: Companies[];
  filteredOptions: Observable<Companies[]>;
  user: Users;

  constructor(
    public dialogRef: MatDialogRef<NewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService,
    public userService: UserService,
    public snackBar: Snack,
    public globales: Globales) {
  }

  ngOnInit() {
    this.roles = this.globales.roles$;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddNewCompany() {
    if (this.campo1.nativeElement.value === '') {
      this.snackBar.openSnackBar(
        this.translate.instant('snack_ingrese_nombre'),
        this.translate.instant('snack_ok'));
    } else {
      this.user.id = 0;
      this.user.name = this.campo1.nativeElement.value;
      this.user.surname = this.campo1.nativeElement.value;
      this.user.email = this.campo2.nativeElement.value;
      this.user.telephone = this.campo3.nativeElement.value;
      this.user.roleId = this.campo4.nativeElement.value;
      this.user.companyId = this.campo0.nativeElement.value;
      this.userService.addNewUser(this.user)
        .subscribe(data => {
          this.datos.push(data);
          this.dialogRef.close();
          const mensaje = this.translate
            .instant('snack_nuevo_cliente');
          const accion = this.translate
            .instant('snack_deshacer');
          this.snackBar.openSnackBar(mensaje, accion);
          this.globales.sideBack$ = false;
          // actualizo el sidenav
          setTimeout(() =>
              this.globales.sideBack$ = true,
            1000);
        });
    }
  }
}

