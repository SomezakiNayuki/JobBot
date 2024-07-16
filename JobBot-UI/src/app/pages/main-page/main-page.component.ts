import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jb-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  protected isSideBarEnabled: boolean = false;

  constructor() { }

  public ngOnInit(): void {
    this.isSideBarEnabled = false;
  }

  protected openSideBar(): void {
    // TODO: add login check before open side bar
    this.isSideBarEnabled = true;
  }

  protected collapseSideBar(): void {
    this.isSideBarEnabled = false;
  }

}
