import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show', () => {
    component.show();

    expect(component.display).toBeTrue();
  });

  it('should close', () => {
    component.close();

    expect(component.display).toBeFalse();
  });
});
