import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from 'src/app/components/meta-components/avatar/avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  const defaultImg: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/D-ABYL_Lufthansa_B748_FRA_%2850549824683%29.jpg/1920px-D-ABYL_Lufthansa_B748_FRA_%2850549824683%29.jpg';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set to default image if no imageSrc provided', () => {
      component.ngOnInit();

      expect(component.imageSrc).toEqual(defaultImg);
    });

    it('should set to image url if imageSrc provided', () => {
      component.imageSrc = 'test.com';
      component.ngOnInit();

      expect(component.imageSrc).toEqual('test.com');
    });

    it('should set to text if text provided', () => {
      component.text = 'Test';
      component.ngOnInit();

      expect(component.text).toEqual('Test');
    });
  });
});
