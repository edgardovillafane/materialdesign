import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

/**
 * The main component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private titleService: Title) {
    this.titleService.setTitle('Material Design');
    this.matIconRegistry.addSvgIcon(
      'es-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/es.png')
    );
    this.matIconRegistry.addSvgIcon(
      'fr-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/fr.png')
    );
    this.matIconRegistry.addSvgIcon(
      'gb-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/gb.png')
    );
    this.matIconRegistry.addSvgIcon(
      'pt-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/pt.png')
    );
  }
}
