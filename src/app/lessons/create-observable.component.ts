import { Component } from '@angular/core';
import { from, Observable, of } from 'rxjs';

@Component({
  selector: 'app-create-observable',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Constructor</mat-card-title>
        </mat-card-header>
        <app-observable-printer
          [printable$]="withConstructor$"
        ></app-observable-printer>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>of creation operator</mat-card-title>
        </mat-card-header>
        <app-observable-printer [printable$]="of$"></app-observable-printer>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>from creation operator</mat-card-title>
        </mat-card-header>
        <app-observable-printer [printable$]="from$"></app-observable-printer>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Emitting after complete</mat-card-title>
        </mat-card-header>
        <app-observable-printer
          [printable$]="notEmittingLast$"
        ></app-observable-printer>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container > mat-card {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class CreateObservableComponent {
  public withConstructor$ = new Observable<any>((observer) => {
    observer.next('Hello');
    observer.next('World');
    observer.complete();
  });

  public of$ = of('Hello', 'Banana');

  public from$ = from('Hello');

  public notEmittingLast$ = new Observable<any>((observer) => {
    observer.next('Woow');
    observer.next('such');
    observer.complete();
    observer.next('empty');
  });
}
