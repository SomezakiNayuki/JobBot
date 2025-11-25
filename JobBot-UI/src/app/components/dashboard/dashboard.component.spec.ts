import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppState } from 'src/app/store/states/app.state';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { JobActions } from 'src/app/store/actions/job/job.actions';
import { JobSelectors } from 'src/app/store/selectors/job/job.selectors';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should select JobSelectors.job from store', () => {
      mockStore.select = jasmine.createSpy().and.returnValue({
        pipe: jasmine.createSpy().and.returnValue({
          subscribe: jasmine.createSpy(),
        }),
      });

      component.ngOnInit();

      expect(mockStore.select).toHaveBeenCalledWith(JobSelectors.job);
    });

    it('should populate jobs$ property', fakeAsync(() => {
      component.ngOnInit();
      tick();
      const jobsSpy = jasmine.createSpy();
      component.jobs$.subscribe(jobsSpy);

      expect(jobsSpy).toHaveBeenCalledWith(jobs);
    }));

    it('should dispatch fetchJob action', () => {
      mockStore.dispatch = jasmine.createSpy();

      component.ngOnInit();

      expect(mockStore.dispatch).toHaveBeenCalledWith(JobActions.fetchJob());
    });
  });
});

const jobs = {
  left: [
    {
      id: 1,
      title: '1',
      pay: 1.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '1',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 2,
      title: '2',
      pay: 2.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '2',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 3,
      title: '3',
      pay: 3.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '3',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 4,
      title: '4',
      pay: 4.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '4',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 5,
      title: '5',
      pay: 5.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '5',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 6,
      title: '6',
      pay: 6.0,
      location: 'Sydney',
      time: [2024, 10, 30, 23, 0],
      description: '6',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 7,
      title: '7',
      pay: 7.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '7',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 8,
      title: '8',
      pay: 8.0,
      location: 'Sydney',
      time: [2024, 11, 1, 23, 0],
      description: '8',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
        role: null,
        userProfile: null,
      },
      employee: null,
      outcome: null,
    },
  ],
  right: [
    {
      id: 1,
      title: '1',
      pay: 1.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '1',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 2,
      title: '2',
      pay: 2.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '2',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 3,
      title: '3',
      pay: 3.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '3',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 4,
      title: '4',
      pay: 4.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '4',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 5,
      title: '5',
      pay: 5.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '5',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 6,
      title: '6',
      pay: 6.0,
      location: 'Sydney',
      time: [2024, 10, 30, 23, 0],
      description: '6',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 7,
      title: '7',
      pay: 7.0,
      location: 'Sydney',
      time: [2024, 10, 31, 23, 0],
      description: '7',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
      },
      employee: null,
      outcome: null,
    },
    {
      id: 8,
      title: '8',
      pay: 8.0,
      location: 'Sydney',
      time: [2024, 11, 1, 23, 0],
      description: '8',
      jobStatusEnum: null,
      employer: {
        id: 1,
        username: 'Henry',
        email: 'HenryTest@gmail.com',
        role: null,
        userProfile: null,
      },
      employee: null,
      outcome: null,
    },
  ],
};

const mockInitialState: AppState = {
  job: {
    jobs: jobs,
  },
};
