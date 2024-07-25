import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jb-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  protected isSideBarEnabled: boolean = false;
  public showLoginForm: boolean = false;
  public showRegisterForm: boolean = false;

  public loginUsername: string = '';
  public loginPassword: string = '';
  public registerUsername: string = '';
  public registerEmail: string = '';
  public registerPassword: string = '';

  constructor() {}

  public ngOnInit(): void {
    this.isSideBarEnabled = false;
  }

  protected openSideBar(): void {
    this.isSideBarEnabled = true;
    this.showLoginForm = true;
    this.showRegisterForm = false;
  }

  protected switchToRegister(): void {
    this.showLoginForm = false;
    this.showRegisterForm = true;
  }

  protected collapseSideBar(): void {
    this.isSideBarEnabled = false;
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
    this.collapseSideBar();
  }

  public onRegisterSubmit(): void {
    // Handle register logic here
    console.log('Registration successful');
    this.collapseSideBar();
  }
}
