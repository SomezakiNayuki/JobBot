import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import UIEventEnum from 'src/enums/ui-event.enum';
import { UIEventService } from 'src/services/ui-event.service';

@Component({
  selector: 'jb-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent implements OnInit {
  @ViewChild('jbModal') jbModal: ModalComponent;

  public showLoginForm: boolean = true;
  public showRegisterForm: boolean = false;

  constructor(private readonly uiEventService: UIEventService) {}

  public ngOnInit(): void {
    this.resetForms();
    this.uiEventService.getUiEventPool().subscribe((event: UIEventEnum) => {
      if (event == UIEventEnum.DISPLAY_AUTH_MODAL) {
        this.jbModal.show();
      }
    });
  }

  protected switchLoginRegister(): void {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterForm = !this.showRegisterForm;
  }

  private closeAuthModal(): void {
    this.jbModal.close();
    this.resetForms();
  }

  private resetForms(): void {
    this.showLoginForm = true;
    this.showRegisterForm = false;
  }

  public onLoginSubmit(): void {
    // Handle login logic here
    console.log('Login successful');
    this.closeAuthModal();
  }

  public onRegisterSubmit(): void {
    // Handle register logic here
    console.log('Registration successful');
    this.closeAuthModal();
  }
}
