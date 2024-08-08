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

  public isLogin: boolean = true;

  private destroy$: Subject<void> = new Subject<void>();

  protected authFormGroup: FormGroup;

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

  private closeAuthModal(): void {
    this.jbModal.close();
  }

  protected initAuthForm(): void {
    this.authFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit(): void {
    if (this.authFormGroup.valid) {
      if (this.isLogin) {
        console.log('handle login request');
      } else {
        console.log('handle register request');
      }
      this.closeAuthModal();
    }
  }
}
