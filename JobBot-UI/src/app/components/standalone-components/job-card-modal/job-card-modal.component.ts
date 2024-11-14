import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { JobDetailComponent } from 'src/app/components/standalone-components/job-card-modal/job-detail/job-detail.component';
import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import { UIEventService } from 'src/app/services/ui-event.service';
import UIEventEnum from 'src/enums/ui-event.enum';

@Component({
  selector: 'jb-job-card-modal',
  templateUrl: './job-card-modal.component.html',
  styleUrls: ['./job-card-modal.component.css'],
})
export class JobCardModalComponent implements OnInit {
  @ViewChild('jbModal') jbModal: ModalComponent;
  @ViewChild('jbJobDetail') jbJobDetail: JobDetailComponent;

  public isCreate: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly uiEventService: UIEventService) {}

  public ngOnInit(): void {
    this.uiEventService
      .getUiEventPool$()
      .pipe(
        takeUntil(this.destroy$) // Unsubscribe when component is destroyed, prevent memory leak
      )
      .subscribe((event: { UIEventEnum: UIEventEnum; config?: {} }) => {
        if (event.UIEventEnum == UIEventEnum.DISPLAY_CREATE_JOB_MODAL) {
          if (event.config) {
            Object.keys(event.config).forEach((key) => {
              this[key] = event.config[key];
            });
          }
          this.jbModal.show();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    this.jbJobDetail.submit();
  }

  public close(): void {
    this.jbModal.close();
  }

  // public onDiscard(): void {
  //   this.jbJobDetail.initJobForm();
  // }
}
