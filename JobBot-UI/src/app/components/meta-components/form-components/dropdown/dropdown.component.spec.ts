import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { DropdownComponent } from 'src/app/components/meta-components/form-components/dropdown/dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('switchCollapseDropdownList', () => {
    it('should switch collapsed status', () => {
      component.collapsed = true;

      component.switchCollapseDropdownList();

      expect(component.collapsed).toBeFalsy();
    });
  });

  describe('onClickDropdownAction', () => {
    it('should switch collapsed status, collapse dropdown list and clear filtered list', () => {
      const action: string = 'test';
      const mockFormControl: FormControl = new FormControl();
      spyOn(mockFormControl, 'setValue');
      spyOn(mockFormControl, 'updateValueAndValidity');
      spyOnProperty(component, 'formControl').and.returnValue(mockFormControl);

      component.onClickDropdownAction(action);

      expect(mockFormControl.setValue).toHaveBeenCalledWith(action);
      expect(mockFormControl.updateValueAndValidity).toHaveBeenCalled();
      expect(component.collapsed).toBeTruthy();
      expect(component.filteredActionList).toEqual(null);
    });
  });

  describe('onTyping', () => {
    it('should filter list by action', () => {
      component.actionList = ['100', '200', '300'];

      component.onTyping('1');

      expect(component.filteredActionList).toEqual(['100']);

      component.onTyping('0');

      expect(component.filteredActionList).toEqual(component.actionList);
    });
  });
});
