import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import UIEventEnum from 'src/enums/ui-event.enum';
import { UIEventService } from 'src/app/services/ui-event.service';

@Component({
  selector: 'jb-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  @ViewChild('jbModal') jbModal: ModalComponent;

  protected authFormGroup: FormGroup;
  protected authResponseError: string;
  protected isLogin: boolean = true;
  protected isRoleScreen: boolean = false;
  private skipRoleScreen: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly uiEventService: UIEventService) {}

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

  protected switchLoginRegister(): void {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.initAuthForm();
    } else {
      this.authFormGroup.addControl(
        'email',
        new FormControl('', [Validators.required, Validators.email])
      );
      this.authFormGroup.addControl(
        'password2',
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

  protected initAuthForm(): void {
    this.isLogin = true;
    this.isRoleScreen = false;
    this.authResponseError = null;
    this.authFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  protected skipRoleScreenAndSubmit(): void {
    this.skipRoleScreen = true;
    this.onSubmit();
  }

  public onSubmit(): void {
    if (this.authFormGroup.valid) {
      if (this.isLogin) {
        console.log('handle login request');
        this.closeAuthModal();
      } else {
        if (!this.isRoleScreen) {
          this.isRoleScreen = true;
          this.initRoleForm();
        } else {
          console.log('handle register request');
          this.closeAuthModal();
        }
      }
    } else {
      if (this.isRoleScreen && this.skipRoleScreen) {
        console.log('handle register request with skipping role screen');
        this.closeAuthModal();
      }
      this.authFormGroup.markAllAsTouched();
    }
  }
}
