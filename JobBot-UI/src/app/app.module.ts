import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModalComponent } from 'src/app/components/standalone-components/auth-modal/auth-modal.component';
import { AvatarComponent } from 'src/app/components/meta-components/avatar/avatar.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { DropdownComponent } from './components/meta-components/form-components/dropdown/dropdown.component';
import { InputComponent } from 'src/app/components/meta-components/form-components/input/input.component';
import { JobCardComponent } from 'src/app/components/standalone-components/job-card/job-card.component';
import { MainPageComponent } from 'src/app/components/pages/main-page/main-page.component';
import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import { PromptComponent } from 'src/app/components/meta-components/prompt/prompt.component';

@NgModule({
  // Please order alphabetically
  declarations: [
    AppComponent,
    AuthModalComponent,
    AvatarComponent,
    DashboardComponent,
    DropdownComponent,
    InputComponent,
    JobCardComponent,
    MainPageComponent,
    ModalComponent,
    PromptComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
