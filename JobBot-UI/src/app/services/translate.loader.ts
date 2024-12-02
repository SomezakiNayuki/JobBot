import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    //TODO: Upgrade to latest angular version 18 and use custom-webpack builder to execute extract-i18n task
    return this.http.get(`src/assets/i18n/${lang}.json`);
  }
}