import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subject',
  template: `
    <div class="single-card-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Subject</mat-card-title>
        </mat-card-header>
        <div>
          <app-observable-printer
            *ngFor="let sub of subjects$"
            [printable$]="sub"
          ></app-observable-printer>
        </div>

        <mat-card-actions>
          <button mat-button (click)="pushValueToSubject()">Add value</button>
          <button mat-button (click)="addSubscriberToSubject()">
            Add subscriber
          </button>
          <button mat-button (click)="completeSubject()">Complete</button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>BehaviorSubject</mat-card-title>
        </mat-card-header>
        <div>
          <app-observable-printer
            *ngFor="let sub of behaviorSubjects$"
            [printable$]="sub"
          ></app-observable-printer>
        </div>

        <mat-card-actions>
          <button mat-button (click)="pushValueToBehaviorSubject()">
            Add value
          </button>
          <button mat-button (click)="addSubscriberToBehaviorSubject()">
            Add subscriber
          </button>
          <button mat-button (click)="completeBehaviorSubject()">
            Complete
          </button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>ReplaySubject</mat-card-title>
        </mat-card-header>
        <div>
          <app-observable-printer
            *ngFor="let sub of replaySubjects$"
            [printable$]="sub"
          ></app-observable-printer>
        </div>

        <mat-card-actions>
          <button mat-button (click)="pushValueToReplaySubject()">
            Add value
          </button>
          <button mat-button (click)="addSubscriberToReplaySubject()">
            Add subscriber
          </button>
          <button mat-button (click)="completeReplaySubject()">Complete</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
})
export class SubjectComponent implements OnInit {
  public subjects$: Observable<any>[] = [];
  public behaviorSubjects$: Observable<any>[] = [];
  public replaySubjects$: Observable<any>[] = [];

  private subject = new Subject();
  private behaviorSubject = new BehaviorSubject('Nice');
  private replaySubject = new ReplaySubject(3);

  private dictionary = [
    'Wooow',
    'such',
    'bananas',
    'nice',
    'keyboard',
    'bro',
    'yaaas',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ];

  public count = 1;

  public get subject$(): Observable<any> {
    return this.subject.asObservable();
  }

  public get behaviorSubject$(): Observable<any> {
    return this.behaviorSubject.asObservable();
  }

  constructor() {}

  ngOnInit(): void {}

  public pushValueToSubject(): void {
    this.subject.next(this.getValue());
  }

  public completeSubject(): void {
    this.subject.complete();
  }

  public pushValueToBehaviorSubject(): void {
    this.behaviorSubject.next(this.getValue());
  }

  public completeBehaviorSubject(): void {
    this.behaviorSubject.complete();
  }

  public pushValueToReplaySubject(): void {
    this.replaySubject.next(this.getValue());
  }

  public completeReplaySubject(): void {
    this.replaySubject.complete();
  }

  private getValue(): string {
    return this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
  }

  public addSubscriberToSubject(): void {
    this.subjects$.push(this.subject.asObservable());
  }

  public addSubscriberToBehaviorSubject(): void {
    this.behaviorSubjects$.push(this.behaviorSubject.asObservable());
  }

  public addSubscriberToReplaySubject(): void {
    this.replaySubjects$.push(this.replaySubject.asObservable());
  }
}
