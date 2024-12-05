import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private readonly translate: TranslateService) {}

  ngOnInit(): void {
    // Set default language
    this.translate.setDefaultLang('en');

    // Optionally use a specific language (fallback to default if not found)
    this.translate.use('en');
  }

}
