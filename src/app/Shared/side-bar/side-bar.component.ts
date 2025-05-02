import { Component } from '@angular/core';
import { BaseComponent } from '../../Core/base/base.component';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../Core/services/language.service';
import { Link } from '../../Core/utils/link';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule,RouterModule,TranslateModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent extends BaseComponent {
  isCollapse: boolean = false;
  links!: Link[];

  constructor(LanguageService: LanguageService, private router: Router) {
    super(LanguageService);
    this.addLinks();
  }

  addLinks() {
    this.links = [
      {
        name: 'Appointment',
        routerLink: 'appointment',
        icon: 'fa-solid fa-circle-info',
      },
    ];
  }
}
