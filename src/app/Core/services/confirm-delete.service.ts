import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteService {

  constructor(private confirmationService: ConfirmationService,private translate:TranslateService) {}

  confirmDelete(
    event: Event,
    acceptCallback: () => void,
    rejectCallback?: () => void
  ): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:this.translate.instant('Do you want to delete this item?'),
      header: this.translate.instant('Warning'),
      icon: 'fa-solid fa-triangle-exclamation',

      rejectButtonProps: {
        severity: 'secondary',
        outlined: true,
        label: this.translate.instant('Cancel'),
        
      },
      acceptButtonProps: {
        label: this.translate.instant('Delete'),
        severity: 'danger',
      },
      accept: acceptCallback,
      reject: rejectCallback,
    });
  }
}
