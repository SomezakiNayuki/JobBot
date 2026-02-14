import { Component, Input, OnInit } from '@angular/core';

import ImageFile from 'src/common-types/image-file.type';
import Job from 'src/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'jb-job-image',
  templateUrl: './job-image.component.html',
  styleUrls: ['./job-image.component.css'],
})
export class JobImageComponent implements OnInit {
  @Input()
  public editMode: boolean = false;
  @Input()
  public jobCardMode: boolean = false;
  @Input()
  public job: Job;

  public images: ImageFile[] = [];

  private uploadIndex: number;
  private imagesToDelete: ImageFile[] = [];

  constructor(private readonly jobService: JobService) {}

  public ngOnInit(): void {
    if (this.job) {
      this.jobService
        .getJobImages(this.job.id)
        .then((imageFiles: { id: number; image: string }[]) => {
          imageFiles.forEach((imageFile) => {
            this.images.push({
              id: imageFile.id,
              url: this.convertToBlobUrl(imageFile.image),
            });
          });
        })
        .catch((error) => console.error(error));
    } else {
      this.uploadIndex = 0;
    }
  }

  private convertToBlobUrl(imageData: string): string {
    return 'data:image/jpeg;base64,' + imageData;
  }

  public triggerImageInput(imageInput: HTMLInputElement): void {
    if (imageInput) {
      imageInput.click();
    }
  }

  public onImageSelected(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    const imageFile: File = input.files[0];
    if (imageFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.images.push({
            id: this.uploadIndex,
            file: imageFile,
            url: reader.result.toString(),
          });
          this.uploadIndex++;
        }
      };
      reader.readAsDataURL(imageFile);
    }
  }

  public deleteImage(id: number) {
    if (this.editMode) {
      const image = this.images.find((image) => image.id == id);
      if (image && !image.file) {
        this.imagesToDelete.push(image);
      }
      this.images = this.images.filter((image) => image.id !== id);
    }
  }

  public uploadImage(jobId: number): void {
    this.imagesToDelete.forEach((image) => {
      this.jobService.deleteJobImage(jobId, image.id);
    });

    this.images.forEach((image) => {
      this.jobService.uploadImage(jobId, image.file);
    });
  }
}
