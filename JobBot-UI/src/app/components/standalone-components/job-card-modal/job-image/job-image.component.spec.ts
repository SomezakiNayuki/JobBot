import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import Job from 'src/models/job.model';
import { JobImageComponent } from 'src/app/components/standalone-components/job-card-modal/job-image/job-image.component';
import { JobService } from 'src/app/services/job.service';

describe('JobImageComponent', () => {
  let component: JobImageComponent;
  let fixture: ComponentFixture<JobImageComponent>;
  let jobService: jasmine.SpyObj<JobService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobImageComponent],
      providers: [
        {
          provide: JobService,
          useValue: {
            getJobImages: jasmine.createSpy(),
            uploadImage: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jobService = TestBed.inject(JobService) as jasmine.SpyObj<JobService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call jobService.getJobImages if is not editMode', () => {
      jobService.getJobImages.and.returnValue(Promise.resolve());
      component.editMode = false;
      component.job = new Job();
      component.job.id = 1;

      component.ngOnInit();

      expect(jobService.getJobImages).toHaveBeenCalledWith(1);
    });

    it('should call populate image if is not editMode (convert to blob url)', fakeAsync(() => {
      jobService.getJobImages.and.returnValue(
        Promise.resolve([{ id: 1, image: 'data' }])
      );
      component.editMode = false;
      component.job = new Job();
      component.job.id = 1;

      component.ngOnInit();
      tick();

      expect(jobService.getJobImages).toHaveBeenCalledWith(1);
      expect(component.images).toEqual([
        { id: 1, url: 'data:image/jpeg;base64,data' },
      ]);
    }));

    it('should set uploadIndex to 0 if is editMode', () => {
      component.editMode = true;
      component['uploadIndex'] = 1;

      component.ngOnInit();

      expect(component['uploadIndex']).toEqual(0);
    });
  });

  describe('deleteImage', () => {
    it('should delete image with given uploadIndex', () => {
      component.editMode = true;
      component.images = [{ id: 1, file: null, url: 'data' }];

      component.deleteImage(1);

      expect(component.images).toEqual([]);
    });
  });

  describe('uploadImage', () => {
    it('should upload all images', () => {
      component.editMode = true;
      component.images = [
        { id: 1, file: {} as File, url: 'data' },
        { id: 2, file: {} as File, url: 'data' },
        { id: 3, file: {} as File, url: 'data' },
      ];

      component.uploadImage(1);

      expect(jobService.uploadImage).toHaveBeenCalledTimes(3);
    });
  });
});
