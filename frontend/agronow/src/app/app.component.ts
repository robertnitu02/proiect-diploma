import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { NavigationBarComponent } from './pages/navigation-bar/navigation-bar.component';

import roLanguage from '../i18n/ro.json';
import enLanguage from '../i18n/en.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private translate: TranslateService
  ) {
    this.translate.setTranslation('ro', roLanguage);
    this.translate.setTranslation('en', enLanguage);

    this.translate.use('ro');
  }

}
