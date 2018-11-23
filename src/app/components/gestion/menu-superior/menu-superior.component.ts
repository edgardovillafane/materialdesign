import {
  Component, EventEmitter, OnInit, Output
} from '@angular/core';
import {Globales} from '../../../classes/globales';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {
  @Output() emitEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(public globales: Globales) {
  }

  ngOnInit() {
  }

  /* selecciona container de listados */
  goList(seccion) {
    this.emitEvent.emit(seccion);
    this.globales.seccionId$ = seccion;
  }
}
