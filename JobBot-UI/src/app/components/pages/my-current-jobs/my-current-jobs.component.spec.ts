import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { JobSelectors } from 'src/app/store/selectors/job/job.selectors';
import { MyCurrentJobsComponent } from 'src/app/components/pages/my-current-jobs/my-current-jobs.component';

describe('MyCurrentJobsComponent', () => {
  let component: MyCurrentJobsComponent;
    let fixture: ComponentFixture<MyCurrentJobsComponent>;
    let store: jasmine.SpyObj<Store<any>>;
  
    beforeEach(() => {
      const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
      TestBed.configureTestingModule({
        declarations: [MyCurrentJobsComponent],
        imports: [
          TranslateModule.forRoot(),
          StoreModule.forRoot({}),
        ],
        providers: [
          { provide: Store, useValue: storeSpy },
        ],
      });
      fixture = TestBed.createComponent(MyCurrentJobsComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(Store) as jasmine.SpyObj<Store<any>>;
      store.select.and.returnValue(of([]));
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    describe('ngOnDestroy', () => {
      it('should call ngOnDestroy and complete $destroy', () => {
        const completeSpy = spyOn((component as any).$destroy, 'complete').and.callThrough();
        component.ngOnDestroy();
        expect(completeSpy).toHaveBeenCalled();
      });
    });
  
    describe('onFilteredJobs', () => {
      it('should set myPostedJobs$ to filtered jobs', () => {
        const filteredJobs = [{ id: 1, title: 'Test Job' }] as any;
        component.onFilteredJobs(filteredJobs);
        component.myCurrentJobs$.subscribe(jobs => {
          expect(jobs).toEqual(filteredJobs);
        });
      });
    });
  
    describe('onClearFilters', () => {
      it('should reset myCurrentJobs$ to store select', () => {
        component.onClearFilters();
        expect((store.select as jasmine.Spy).calls.mostRecent().args[0]).toBe(JobSelectors.myCurrentJobs);
      });
    });
});
