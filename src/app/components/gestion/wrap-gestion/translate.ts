import {TranslateService} from "@ngx-translate/core";
import {MatPaginatorIntl} from '@angular/material';

export class MatPaginationIntlService extends MatPaginatorIntl {
  translate: TranslateService;
  firstPageLabel = 'First page';
  itemsPerPageLabel = 'Items per page';
  lastPageLabel = 'Last page';
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';
  ofPageLabel = 'of';

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;
    translate.setDefaultLang('en');
    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {

    this.firstPageLabel = this.translate.instant('first_page');
    this.itemsPerPageLabel = this.translate.instant('items_per_page');
    this.lastPageLabel = this.translate.instant('last_page');
    this.nextPageLabel = this.translate.instant('next_page');
    this.previousPageLabel = this.translate.instant('previous_page');
    this.ofPageLabel = this.translate.instant('de');

  }
}
