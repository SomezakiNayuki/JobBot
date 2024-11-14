import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModalComponent } from 'src/app/components/standalone-components/auth-modal/auth-modal.component';
import { AvatarComponent } from 'src/app/components/meta-components/avatar/avatar.component';
import { DatePickerComponent } from 'src/app/components/meta-components/form-components/date-picker/date-picker.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { DropdownComponent } from 'src/app/components/meta-components/form-components/dropdown/dropdown.component';
import { InputComponent } from 'src/app/components/meta-components/form-components/input/input.component';
import { JobCardComponent } from 'src/app/components/standalone-components/job-card/job-card.component';
import { MainPageComponent } from 'src/app/components/pages/main-page/main-page.component';
import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import { PromptComponent } from 'src/app/components/meta-components/prompt/prompt.component';
import { JobCardModalComponent } from 'src/app/components/standalone-components/job-card-modal/job-card-modal.component';
import { JobPictureComponent } from 'src/app/components/standalone-components/job-card-modal/job-picture/job-picture.component';
import { JobDetailComponent } from 'src/app/components/standalone-components/job-card-modal/job-detail/job-detail.component';
import { TextareaComponent } from 'src/app/components/meta-components/form-components/textarea/textarea.component';
import { TimePickerComponent } from 'src/app/components/meta-components/form-components/time-picker/time-picker.component';

// ngx-bootstrap dependencies
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

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
    JobCardModalComponent,
    MainPageComponent,
    ModalComponent,
    PromptComponent,
    JobPictureComponent,
    JobDetailComponent,
    TextareaComponent,

    // ngx-bootstrap dependencies
    DatePickerComponent,
    TimePickerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // ngx-bootstrap dependencies
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
