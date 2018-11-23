import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class Snack {
  constructor(public snackBar: MatSnackBar) {}


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });


  }

}
