import { DialogService } from 'primeng/dynamicdialog';
import { Injectable, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CustomeDialogService {
  constructor(
    private translateService: TranslateService,
    private dialogService: DialogService
  ) {}

  open(data: {
    Component: any;
    header: string;
    dialogData?: any;
    width?: string;
    height?: string;
  }) {
    const {
      Component,
      header,
      dialogData,
      width = '580px',  
      height = '750px' 
    } = data;

    return this.dialogService.open(Component, {
      header: this.translateService.instant(header),
      width,
      height,
      dismissableMask: true,
      data: dialogData,
      closable: true,
    });
  }
}
