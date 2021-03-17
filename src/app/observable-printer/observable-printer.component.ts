import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-observable-printer',
  template: `
    <mat-chip-list>
      <span *ngIf="title">{{ title }}</span>
      <mat-chip>Subscribed</mat-chip>
      <mat-chip *ngFor="let value of values" color="accent" selected>{{
        value | json
      }}</mat-chip>
      <mat-chip *ngIf="isErrored" color="warn" selected>{{ error }}</mat-chip>
      <mat-chip *ngIf="isCompleted">Completed</mat-chip>
    </mat-chip-list>
  `,
  styles: [],
})
export class ObservablePrinterComponent implements OnInit, OnDestroy {
  @Input() title?: string;
  @Input() printable$!: Observable<unknown>;

  public values: unknown[] = [];
  public isCompleted = false;
  public isErrored = false;
  public error: any;

  private destroy$ = new Subject();

  constructor() {}

  public ngOnInit(): void {
    this.printable$.pipe(takeUntil(this.destroy$)).subscribe(
      (value) => {
        this.values.push(value);
      },
      (err) => {
        this.isErrored = true;
        this.error = err;
      },
      () => {
        this.isCompleted = true;
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
