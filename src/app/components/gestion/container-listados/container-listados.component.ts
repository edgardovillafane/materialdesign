import {Component, Injectable, OnInit} from '@angular/core';
import {Globales} from '../../../classes/globales';
import {
  DataSharingService
} from '../../../services/data-sharing.service';
import {AuthService} from '../../../services/auth.service';
/**
 * Container Listados component
 *
 * This component works as a WRAP of listing :
 *
 * Keep in a global the selected section (Arbol, Esat or Usuarios) by subscribe a observable var.
 *
 */
@Component({
  selector: 'app-container-listados',
  templateUrl: './container-listados.component.html',
  styleUrls: ['./container-listados.component.css']
})

@Injectable()
export class ContainerListadosComponent implements OnInit {
  nodeSelId: number;
  seccion: number;
  autorizado: boolean;

  /**
   *
   * @param globales
   * @param auth
   * @param dataSharingService
   */
  constructor(
    public globales: Globales,
    public auth: AuthService,
    private dataSharingService: DataSharingService) {
    this.dataSharingService.nodeSelId.subscribe(value => {
      this.nodeSelId = value;
      this.globales.companyIdSelected$ = value;
    });
  }

  /**
   * set the global menu section in the first element
   */
  ngOnInit() {
    this.globales.seccionId$ = 1;
    this.autorizado = false;
  }

  /**
   * Write in global var the current section to keep the list when navigate between components.
   * @param sec number of the section selected. 1=esat, 2=arbol, 3=usuarios
   */
  asignaCont(sec: number) {
    this.seccion = sec;
    this.globales.seccionId$ = sec;
  }

  /**
   *
   * @param sec number of the section selected. 1=esat, 2=arbol, 3=usuarios
   */
  getListados(sec: number) {
    this.seccion = 0;
    this.globales.seccionId$ = 0;
    setTimeout(() =>
      this.seccion = sec, 10);
    setTimeout(() =>
      this.globales.seccionId$ = sec, 10);
  }
}
