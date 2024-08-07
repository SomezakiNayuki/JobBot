import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModalComponent } from 'src/app/components/standalone-components/auth-modal/auth-modal.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { InputComponent } from 'src/app/components/meta-components/input/input.component';
import { JobCardComponent } from 'src/app/components/standalone-components/job-card/job-card.component';
import { MainPageComponent } from 'src/app/pages/main-page/main-page.component';
import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import { PromptComponent } from './components/meta-components/prompt/prompt.component';
import { AvatarComponent } from './components/meta-components/avatar/avatar.component';

@NgModule({
  // Please order alphabetically
  declarations: [
    AppComponent,
    AuthModalComponent,
    DashboardComponent,
    InputComponent,
    JobCardComponent,
    MainPageComponent,
    ModalComponent,
    PromptComponent,
    AvatarComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
