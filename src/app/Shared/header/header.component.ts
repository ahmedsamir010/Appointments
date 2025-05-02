import { LanguageService } from './../../Core/services/language.service';
import { Component } from '@angular/core';
import { BaseComponent } from '../../Core/base/base.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends BaseComponent {
  constructor(languageService:LanguageService){
    super(languageService)
  }
}
