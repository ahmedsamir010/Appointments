import { OnDestroy, OnInit } from '@angular/core';
 import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LanguageService } from '../services/language.service';

import { Directive } from '@angular/core';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  public currentLanguage!: string;
  private destroy$ = new Subject<void>();

  constructor(public languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang) => {
        this.currentLanguage = lang;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
