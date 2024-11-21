import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { AuthModalComponent } from 'src/app/components/standalone-components/auth-modal/auth-modal.component';
import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import { UserService } from 'src/app/services/user.service';

describe('AuthModalComponent', () => {
  let authModalComponent: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;
  let modalComponent: ModalComponent;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthModalComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {
            registerUser: jasmine.createSpy().and.returnValue({
              then: jasmine.createSpy().and.returnValue({
                catch: jasmine.createSpy(),
              }),
            }),
            authenticateUser: jasmine.createSpy().and.returnValue({
              then: jasmine.createSpy().and.returnValue({
                catch: jasmine.createSpy(),
              }),
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthModalComponent);
    authModalComponent = fixture.componentInstance;
    fixture.detectChanges();

    modalComponent = TestBed.createComponent(ModalComponent).componentInstance;
    authModalComponent.jbModal = modalComponent;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(authModalComponent).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init auth form', () => {
      authModalComponent.authFormGroup = null;

      authModalComponent.ngOnInit();

      verifyInitAuthForm();
    });
  });

  describe('show', () => {
    it('should call modal component show()', () => {
      authModalComponent.jbModal.show = jasmine.createSpy();

      authModalComponent.show();

      expect(authModalComponent.jbModal.show).toHaveBeenCalled();
    });
  });

  describe('switchLoginRegister', () => {
    describe('if login', () => {
      it('should init auth form', () => {
        authModalComponent.isLogin = false;

        authModalComponent.switchLoginRegister();

        verifyInitAuthForm();
      });
    });

    describe('if register', () => {
      it('should add register form', () => {
        authModalComponent.isLogin = true;

        authModalComponent.switchLoginRegister();

        expect(authModalComponent.isLogin).toBeFalsy();
        expect(
          Object.keys(authModalComponent.authFormGroup.controls).length
        ).toBe(4);
      });
    });
  });

  describe('initAuthForm', () => {
    it('should init auth form', () => {
      authModalComponent.initAuthForm();

      verifyInitAuthForm();
    });
  });

  describe('skipRoleScreenAndSubmit', () => {
    it('should call onSubmit()', () => {
      spyOn(authModalComponent, 'onSubmit');

      authModalComponent.skipRoleScreenAndSubmit();

      expect(authModalComponent.onSubmit).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should handle invalid form', () => {
      setUpMockAuthFormValidity(false);
      authModalComponent['skipRoleScreen'] = false;

      authModalComponent.onSubmit();

      expect(
        authModalComponent.authFormGroup.markAllAsTouched
      ).toHaveBeenCalled();
    });

    it('should handle login', () => {
      setUpMockAuthFormValidity(true);
      authModalComponent['skipRoleScreen'] = true;
      authModalComponent.isLogin = true;

      authModalComponent.onSubmit();

      expect(userService.authenticateUser).toHaveBeenCalled();
    });

    it('should handle register', () => {
      setUpMockAuthFormValidity(true);
      authModalComponent['skipRoleScreen'] = true;
      authModalComponent.isLogin = false;
      authModalComponent.isRoleScreen = true;

      authModalComponent.onSubmit();

      expect(
        authModalComponent.authFormGroup.get('any').reset
      ).toHaveBeenCalled();
      expect(userService.registerUser).toHaveBeenCalled();
    });

    describe('should check if password matches', () => {
      it('should not set error if passed', () => {
        setUpMockAuthFormForRegistration();

        authModalComponent.authFormGroup.get('password').setValue('1');
        authModalComponent.authFormGroup.get('reEnterPassword').setValue('1');

        authModalComponent.onSubmit();

        expect(authModalComponent.authResponseError).toBe(null);
        expect(authModalComponent.isRoleScreen).toBeTruthy();
        expect(
          Object.keys(authModalComponent.authFormGroup.controls).length
        ).toBe(6);
      });

      it('should set error if not passed', () => {
        setUpMockAuthFormForRegistration();

        authModalComponent.authFormGroup.get('password').setValue('1');
        authModalComponent.authFormGroup.get('reEnterPassword').setValue('2');

        authModalComponent.onSubmit();

        expect(authModalComponent.authResponseError).toBe(
          'Password re-enetered does not match'
        );
      });
    });
  });

  function verifyInitAuthForm(): void {
    expect(authModalComponent.isLogin).toBeTruthy();
    expect(authModalComponent.isRoleScreen).toBeFalsy();
    expect(authModalComponent.authResponseError).toBe(null);
    expect(Object.keys(authModalComponent.authFormGroup.controls).length).toBe(
      2
    );
  }

  function setUpMockAuthFormValidity(valid: boolean) {
    authModalComponent.authFormGroup = jasmine.createSpyObj('FormGroup', [], {
      valid: valid,
      markAllAsTouched: jasmine.createSpy(),
      get: jasmine.createSpy().and.returnValue({
        reset: jasmine.createSpy(),
      }),
    });
  }

  function setUpMockAuthFormForRegistration(): void {
    authModalComponent['skipRoleScreen'] = true;
    authModalComponent.isLogin = true;
    authModalComponent.switchLoginRegister();
    authModalComponent.isLogin = false;
    authModalComponent.isRoleScreen = false;
  }
});
