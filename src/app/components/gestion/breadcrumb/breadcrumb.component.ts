import {Component} from '@angular/core';
/**
 * Breadcrumb component
 *
 * This component build a ant path to show above the list the path in tree node companies :
 *
 * eg. Distributor 1 > Subdistributor 2 > Company 3 > Local 4
 *
 */
@Component({
  selector: 'app-breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.css']
})

export class BreadcrumbComponent {
  /**
   * @param caminoMiga Define the breadcrumb string showed above the list
   */
  caminoMiga: string;


  constructor() {
  }

  /**
   * Write the breadcrumb, obtained when a company in sidenav tree is selected.
   * @param valor
   */
  escribeMiga(valor: string) {
    this.caminoMiga = valor;
  }

}
