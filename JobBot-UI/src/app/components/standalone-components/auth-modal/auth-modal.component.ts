import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'jb-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthModalComponent implements OnInit {
  @ViewChild(ModalComponent) jbModal: ModalComponent;

  public readonly USERNAME = 'username';
  public readonly RE_ENTER_PASSWORD = 'reEnterPassword';
  public readonly WORK_ELIGIBILITY = 'workEligibility';
  public readonly VISA_TYPE = 'visaType';
  public readonly ID_CARD_NUMBER = 'idCardNumber';
  public readonly EMAIL = 'email';
  public readonly PASSWORD = 'password';

  public authFormGroup: FormGroup;
  public authResponseError: string;
  public isLogin: boolean = true;
  public isRoleScreen: boolean = false;

  private skipRoleScreen: boolean = false;

  constructor(
    private readonly translate: TranslateService,
    private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.initAuthForm();
  }

  public show(): void {
    this.jbModal.show();
  }

  public switchLoginRegister(): void {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.initAuthForm();
    } else {
      this.authFormGroup.addControl(
        this.USERNAME,
        new FormControl('', [Validators.required])
      );
      this.authFormGroup.addControl(
        this.RE_ENTER_PASSWORD,
        new FormControl('', [Validators.required])
      );
    }
  }

  private initRoleForm(): void {
    this.authFormGroup.addControl(
      this.WORK_ELIGIBILITY,
      new FormControl('', [Validators.required])
    );
    this.authFormGroup.addControl(this.VISA_TYPE, new FormControl(''));
    this.authFormGroup.addControl(
      this.ID_CARD_NUMBER,
      new FormControl('', [Validators.required])
    );
    this.skipRoleScreen = false;
  }

  private resetRoleForm(): void {
    this.authFormGroup.get(this.WORK_ELIGIBILITY).reset();
    this.authFormGroup.get(this.VISA_TYPE).reset();
    this.authFormGroup.get(this.ID_CARD_NUMBER).reset();
  }

  private closeAuthModal(): void {
    this.jbModal.close();
  }

  public initAuthForm(): void {
    this.isLogin = true;
    this.isRoleScreen = false;
    this.authResponseError = null;
    this.authFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public skipRoleScreenAndSubmit(): void {
    this.skipRoleScreen = true;
    this.onSubmit();
  }

  public onSubmit(): void {
    if (!this.authFormGroup.valid && !this.skipRoleScreen) {
      return this.handleInvalidForm();
    }

    if (this.isLogin) {
      return this.handleUserLogin();
    }

    if (this.isRoleScreen) {
      if (this.skipRoleScreen) {
        this.resetRoleForm();
      }
      return this.handleUserRegister();
    }

    if (!this.checkPasswordMatch()) {
      return;
    }
    this.isRoleScreen = true;
    this.initRoleForm();
  }

  private checkPasswordMatch(): boolean {
    this.authResponseError = null;
    const passwordControl: AbstractControl = this.authFormGroup.get(this.PASSWORD);
    const reEnterPasswordControl: AbstractControl =
      this.authFormGroup.get(this.RE_ENTER_PASSWORD);
    const result: boolean =
      passwordControl.value == reEnterPasswordControl.value;
    if (!result) {
      this.authResponseError = this.translate.instant('auth-modal.form.placeholder.reEnterPassword.mismatch');
      return result;
    }
    this.authFormGroup.removeControl(this.RE_ENTER_PASSWORD);
    return result;
  }

  private handleInvalidForm(): void {
    this.authFormGroup.markAllAsTouched();
  }

  private handleUserRegister(): void {
    this.userService
      .registerUser(this.authFormGroup.value)
      .then(() => {
        this.closeAuthModal();
      })
      .catch((error) => {
        this.authResponseError = error.error?.message;
      });
  }

  private handleUserLogin(): void {
    this.userService
      .authenticateUser(this.authFormGroup.value)
      .then(() => {
        this.closeAuthModal();
      })
      .catch((error) => {
        this.authResponseError = error.error?.message;
      });
  }
}
