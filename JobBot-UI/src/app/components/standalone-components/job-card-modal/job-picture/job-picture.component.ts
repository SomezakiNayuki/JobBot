import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jb-job-picture',
  templateUrl: './job-picture.component.html',
  styleUrls: ['./job-picture.component.css'],
})
export class JobPictureComponent implements OnInit {
  @Input()
  public isCreate: boolean = false;

  public pictures: string[] = [
    'https://lexisenglish.com/wp-content/uploads/2018/12/job.jpg',
    'https://lexisenglish.com/wp-content/uploads/2018/12/job.jpg',
    'https://lexisenglish.com/wp-content/uploads/2018/12/job.jpg',
    'https://lexisenglish.com/wp-content/uploads/2018/12/job.jpg',
  ];

  constructor() {}

  public ngOnInit(): void {}
}
