import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { MyPostedJobsComponent } from 'src/app/components/pages/my-posted-jobs/my-posted-jobs.component';
import { JobSelectors } from 'src/app/store/selectors/job/job.selectors';

describe('MyPostedJobsComponent', () => {
  let component: MyPostedJobsComponent;
  let fixture: ComponentFixture<MyPostedJobsComponent>;
  let store: jasmine.SpyObj<Store<any>>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    TestBed.configureTestingModule({
      declarations: [MyPostedJobsComponent],
      imports: [
        TranslateModule.forRoot(),
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: Store, useValue: storeSpy },
      ],
    });
    fixture = TestBed.createComponent(MyPostedJobsComponent);
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
      component.myPostedJobs$.subscribe(jobs => {
        expect(jobs).toEqual(filteredJobs);
      });
    });
  });

  describe('onClearFilters', () => {
    it('should reset myPostedJobs$ to store select', () => {
      component.onClearFilters();
      expect((store.select as jasmine.Spy).calls.mostRecent().args[0]).toBe(JobSelectors.myPostedJobs);
    });
  });
});