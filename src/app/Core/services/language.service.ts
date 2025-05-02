import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>(localStorage.getItem('language') || 'en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();
   constructor(private translate: TranslateService, private router: Router) {
    const pathArray = window.location.pathname.split('/');
     const initialLang = pathArray.includes('ar') ? 'ar' : 'en';
    this.currentLanguageSubject.next(initialLang);
    localStorage.setItem('language', initialLang);
    this.translate.use(initialLang);
    this.setDirection(initialLang);
  }

  toggleLanguage() {
    const newLang = this.currentLanguageSubject.value === 'en' ? 'ar' : 'en';
    this.currentLanguageSubject.next(newLang);
    localStorage.setItem('language', newLang);
  
    const pathArray = window.location.pathname.split('/');
    pathArray[1] = newLang; 
    const newPath = pathArray.join('/');
  
    const queryString = window.location.search;  
    const fullUrl = newPath + queryString;
  
    this.translate.use(newLang);
    this.translate.setDefaultLang(newLang);
    this.setDirection(newLang);
  
    this.router.navigateByUrl(fullUrl);  
  }
  

  getCurrentLanguage(): string {
    return location.pathname.split('/')[1] || 'ar';
  }

  private setDirection(lang: string) {
    const dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', dir);
  }

  updateURL(lang: string) {
    const currentPath = this.router.url.split('/').slice(2).join('/');
    this.router.navigate([`/${lang}/${currentPath}`])
  }
}