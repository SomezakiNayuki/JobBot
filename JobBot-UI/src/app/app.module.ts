import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobCardComponent } from './components/standalone-components/job-card/job-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DashboardComponent,
    JobCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
