import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-info',
  template: `
    <mat-nav-list>
      <a mat-list-item href="http://reactivex.io"
        ><mat-icon mat-list-icon>launch</mat-icon>ReactiveX</a
      >
      <a mat-list-item href="https://rxjs.dev"
        ><mat-icon mat-list-icon>launch</mat-icon>Official RxJS Documentation</a
      >
      <a mat-list-item href="https://www.learnrxjs.io/"
        ><mat-icon mat-list-icon>launch</mat-icon>Learnrxjs.io by&nbsp;
        <a href="https://twitter.com/BTroncone"> @BTroncone</a></a
      >
    </mat-nav-list>
  `,
  styles: [],
})
export class MoreInfoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
