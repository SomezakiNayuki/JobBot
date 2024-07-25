import { Component, OnInit } from '@angular/core';

import UIEventEnum from 'src/enums/ui-event.enum';
import { UIEventService } from 'src/services/ui-event.service';

@Component({
  selector: 'jb-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent implements OnInit {
  public showLoginForm: boolean = false;
  public showRegisterForm: boolean = false;

  public loginUsername: string = '';
  public loginPassword: string = '';
  public registerUsername: string = '';
  public registerEmail: string = '';
  public registerPassword: string = '';

  constructor(private readonly uiEventService: UIEventService) {}

  public ngOnInit(): void {
    this.uiEventService.getUiEventPool().subscribe((event: UIEventEnum) => {
      if (event == UIEventEnum.DISPLAY_AUTH_MODAL) {
        this.showLoginForm = true;
      }
    });
  }

  protected switchLoginRegister(): void {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterForm = !this.showRegisterForm;
  }

  protected closeAuthModal(): void {
    this.showLoginForm = false;
    this.showRegisterForm = false;
    this.resetForms();
  }

  private resetForms(): void {
    this.loginUsername = '';
    this.loginPassword = '';
    this.registerUsername = '';
    this.registerEmail = '';
    this.registerPassword = '';
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
