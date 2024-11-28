import { Component, Input, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import Job from 'src/models/job.model';

@Component({
  selector: 'jb-job-picture',
  templateUrl: './job-picture.component.html',
  styleUrls: ['./job-picture.component.css'],
})
export class JobPictureComponent implements OnInit {
  @Input()
  public createMode: boolean = false;
  @Input()
  public jobCardMode: boolean = false;
  @Input()
  public job: Job;

  public pictures: {id: number, file?: File, url: string}[] = [];
  
  private uploadIndex: number;

  constructor(
    private readonly jobService: JobService,
  ) {}

  public ngOnInit(): void {
    if (!this.createMode && !!this.job) {
      this.jobService.getJobImages(this.job.id)
      .then((imageFiles: { id: number, image: string }[]) => {
        console.log('HENRY TEST');
        console.log(imageFiles);
        imageFiles.forEach(imageFile => {
          this.pictures.push({id: imageFile.id, url: this.convertToBlobUrl(imageFile.image)});
        })
      })
      .catch(() => {});
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
          this.pictures.push({id: this.uploadIndex, file: imageFile, url: reader.result.toString()});
          this.uploadIndex++;
        }
      };
      reader.readAsDataURL(imageFile);
    }
  }

  public deleteImage(id: number) {
    if (this.createMode) {
      this.pictures = this.pictures.filter(pic => pic.id !== id);
    }
  }

  public uploadImage(jobId: number): void {
    const pictureFiles: File[] = this.pictures.map(picture => picture.file);
    pictureFiles.forEach(picture => {
      this.jobService.uploadImage(jobId, picture);
    })
  }
}
