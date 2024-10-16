import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import UIEventEnum from 'src/enums/ui-event.enum';
import { UIEventService } from 'src/app/services/ui-event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'jb-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  @ViewChild('jbModal') jbModal: ModalComponent;

  public authFormGroup: FormGroup;
  public authResponseError: string;
  public isLogin: boolean = true;
  public isRoleScreen: boolean = false;
  private skipRoleScreen: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly uiEventService: UIEventService,
    private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.initAuthForm();
    this.uiEventService
      .getUiEventPool$()
      .pipe(
        takeUntil(this.destroy$) // Unsubscribe when component is destroyed, prevent memory leak
      )
      .subscribe((event: UIEventEnum) => {
        if (event == UIEventEnum.DISPLAY_AUTH_MODAL) {
          this.jbModal.show();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public switchLoginRegister(): void {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.initAuthForm();
    } else {
      this.authFormGroup.addControl(
        'username',
        new FormControl('', [Validators.required])
      );
      this.authFormGroup.addControl(
        'reEnterPassword',
        new FormControl('', [Validators.required])
      );
    }
  }

  private initRoleForm(): void {
    this.authFormGroup.addControl(
      'workEligibility',
      new FormControl('', [Validators.required])
    );
    this.authFormGroup.addControl(
      'visaType',
      new FormControl('', [Validators.required])
    );
    this.authFormGroup.addControl(
      'idCardNumber',
      new FormControl('', [Validators.required])
    );
    this.skipRoleScreen = false;
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
    const passwordControl: AbstractControl = this.authFormGroup.get('password');
    const reEnterPasswordControl: AbstractControl =
      this.authFormGroup.get('reEnterPassword');
    const result: boolean =
      passwordControl.value == reEnterPasswordControl.value;
    if (!result) {
      this.authResponseError = 'Password re-enetered does not match';
    }
    this.authFormGroup.removeControl('reEnterPassword');
    return result;
  }

  private handleInvalidForm(): void {
    this.authFormGroup.markAllAsTouched();
  }

  private handleUserRegister(): void {
    this.userService
      .registerUser(this.authFormGroup.value)
      .then((response) => {
        this.closeAuthModal();
      })
      .catch((error) => {
        this.authResponseError = error.error?.message;
      });
  }

  private handleUserLogin(): void {
    this.userService
      .authenticateUser(this.authFormGroup.value)
      .then((response) => {
        this.closeAuthModal();
      })
      .catch((error) => {
        this.authResponseError = error.error?.message;
      });
  }
}
