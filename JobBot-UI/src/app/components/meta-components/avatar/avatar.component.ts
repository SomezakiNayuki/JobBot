import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jb-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  @Input()
  public imageSrc: string;
  @Input()
  public text: string;
  @Input()
  public backgroundColor: string = 'white';

  protected textOnly: boolean;

  private defaultImg: string =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/D-ABYL_Lufthansa_B748_FRA_%2850549824683%29.jpg/1920px-D-ABYL_Lufthansa_B748_FRA_%2850549824683%29.jpg';

  constructor() {}

  public ngOnInit(): void {
    this.textOnly = !!this.text;
    if (!this.textOnly && !this.imageSrc) {
      this.imageSrc = this.defaultImg;
    }
    // this.checkIsValidComponentUsage();
  }

  // Set to default image if both [text] or [imageSrc] not provided or in invalid value
  // private checkIsValidComponentUsage(): void {
  //   if (!this.text && !this.imageSrc) {
  //     throw new Error('AvatarComponent must have either [text] or [imageSrc] value');
  //   }
  // }
}
