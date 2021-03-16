import { Component } from '@angular/core';
import {
  forkJoin,
  zip,
  interval,
  of,
  Subject,
  from,
  throwError,
  combineLatest,
  Observable,
  concat,
} from 'rxjs';
import {
  catchError,
  delay,
  map,
  mergeMap,
  pluck,
  scan,
  switchMap,
  take,
} from 'rxjs/operators';

@Component({
  selector: 'app-common-operators',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>map</mat-card-title>
        </mat-card-header>

        <app-observable-printer
          title="source"
          [printable$]="mapExample.source$"
        ></app-observable-printer>

        <app-observable-printer
          title="transformed"
          [printable$]="mapExample.transformed$"
        ></app-observable-printer>

        <mat-card-actions>
          <button mat-button (click)="mapExample.start()">Start</button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>scan</mat-card-title>
        </mat-card-header>

        <app-observable-printer
          title="source"
          [printable$]="scanExample.source$"
        ></app-observable-printer>

        <app-observable-printer
          title="transformed"
          [printable$]="scanExample.transformed$"
        ></app-observable-printer>

        <mat-card-actions>
          <button mat-button (click)="scanExample.start()">Start</button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>pluck</mat-card-title>
        </mat-card-header>

        <app-observable-printer
          title="source"
          [printable$]="pluckExample.source$"
        ></app-observable-printer>

        <app-observable-printer
          title="transformed"
          [printable$]="pluckExample.transformed$"
        ></app-observable-printer>

        <mat-card-actions>
          <button mat-button (click)="pluckExample.start()">Start</button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Transformations</mat-card-title>
        </mat-card-header>

        <app-observable-printer
          title="switchMap"
          [printable$]="switchMapExample$"
        ></app-observable-printer>
        <app-observable-printer
          title="mergeMap"
          [printable$]="mergeMapExample$"
        ></app-observable-printer>

        <mat-card-actions>
          <button mat-button (click)="emitValue()">Emit value</button>
          <button mat-button (click)="completeSubject()">
            Complete subject
          </button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>catchError</mat-card-title>
        </mat-card-header>

        <app-observable-printer
          title="source"
          [printable$]="catchErrorExample.source$"
        ></app-observable-printer>

        <app-observable-printer
          title="catched"
          [printable$]="catchErrorExample.catched$"
        ></app-observable-printer>

        <mat-card-actions>
          <button mat-button (click)="catchErrorExample.start()">Start</button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>concat</mat-card-title>
        </mat-card-header>
        <app-observable-printer
          title="source 1"
          [printable$]="concatExample.source1$"
        ></app-observable-printer>
        <app-observable-printer
          title="source 2"
          [printable$]="concatExample.source2$"
        ></app-observable-printer>
        <app-observable-printer
          title="source 3"
          [printable$]="concatExample.source3$"
        ></app-observable-printer>
        <app-observable-printer
          title="concatenated"
          [printable$]="concatExample.result$"
        ></app-observable-printer>
      </mat-card>

      <mat-card *ngIf="forkJoinExample">
        <mat-card-header>
          <mat-card-title>forkJoin</mat-card-title>
        </mat-card-header>
        <app-observable-printer
          title="source 1"
          [printable$]="forkJoinExample.source1$"
        ></app-observable-printer>
        <app-observable-printer
          title="source 2"
          [printable$]="forkJoinExample.source2$"
        ></app-observable-printer>
        <app-observable-printer
          title="source 3"
          [printable$]="forkJoinExample.source3$"
        ></app-observable-printer>
        <app-observable-printer
          title="forkJoined"
          [printable$]="forkJoinExample.forkJoined$"
        ></app-observable-printer>

        <mat-card-actions>
          <button mat-button (click)="forkJoinExample.start()">Start</button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>zip</mat-card-title>
        </mat-card-header>
        <app-observable-printer
          title="source 1"
          [printable$]="zipExample.source1$"
        ></app-observable-printer>
        <app-observable-printer
          title="source 2"
          [printable$]="zipExample.source2$"
        ></app-observable-printer>
        <app-observable-printer
          title="source 3"
          [printable$]="zipExample.source3$"
        ></app-observable-printer>
        <app-observable-printer
          title="zipped"
          [printable$]="zipExample.zipped$"
        ></app-observable-printer>

        <mat-card-actions>
          <button mat-button (click)="zipExample.start()">Start</button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>combineLatest</mat-card-title>
        </mat-card-header>
        <app-observable-printer
          title="source 1"
          [printable$]="combineLatestExample.source1$"
        ></app-observable-printer>
        <app-observable-printer
          title="source 2"
          [printable$]="combineLatestExample.source2$"
        ></app-observable-printer>
        <app-observable-printer
          title="source 3"
          [printable$]="combineLatestExample.source3$"
        ></app-observable-printer>
        <app-observable-printer
          title="combined"
          [printable$]="combineLatestExample.combined$"
        ></app-observable-printer>

        <mat-card-actions>
          <button mat-button (click)="combineLatestExample.start()">
            Start
          </button>
        </mat-card-actions>
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
export class CommonOperatorsComponent {
  private subject = new Subject();

  public forkJoinExample = this.getForkJoinExample();
  public concatExample = this.getConcatExample();
  public zipExample = this.getZipExample();
  public combineLatestExample = this.getCombineLatestExample();
  public mapExample = this.getMapExample();
  public scanExample = this.getScanExample();
  public pluckExample = this.getPluckExample();
  public catchErrorExample = this.getCatchErrorExample$();
  public switchMapExample$ = this.subject
    .asObservable()
    .pipe(switchMap((event) => this.getDelayed$('switched!')));
  public mergeMapExample$ = this.subject
    .asObservable()
    .pipe(mergeMap(() => this.getDelayed$('merged!')));

  public emitValue() {
    this.subject.next();
  }

  public completeSubject() {
    this.subject.complete();
  }

  private getMapExample() {
    const { start, transform } = this.starterFactory();

    const source$ = transform(from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    const transformed$ = source$.pipe(map((value) => value * 2));

    return {
      start,
      source$,
      transformed$,
    };
  }

  private getScanExample() {
    const { start, transform } = this.starterFactory();

    const source$ = transform(of(1, 2, 3, 4, 5));
    const transformed$ = source$.pipe(scan((acc, curr) => acc + curr));

    return {
      start,
      source$,
      transformed$,
    };
  }

  private getPluckExample() {
    const { start, transform } = this.starterFactory();

    const source$ = transform(
      from([
        { id: 1, label: 'One' },
        { id: 2, label: 'Two' },
        { id: 3, label: 'Three' },
      ])
    );
    const transformed$ = source$.pipe(pluck('label'));

    return {
      start,
      source$,
      transformed$,
    };
  }

  private getCatchErrorExample$() {
    const { start, transform } = this.starterFactory();

    const source$ = transform(interval(1000).pipe(take(5)));
    return {
      start,
      source$,
      catched$: source$.pipe(
        map(() => {
          throw Error('Damn I slipped!');
        }),
        catchError((err) => {
          console.error(err);
          return throwError('Look like you messed up.. 🥲');
        })
      ),
    };
  }

  private getForkJoinExample() {
    const { start, transform } = this.starterFactory();
    const source1$ = transform(interval(1000).pipe(take(3)));
    const source2$ = transform(interval(2000).pipe(take(3)));
    const source3$ = transform(interval(3000).pipe(take(3)));
    return {
      start,
      source1$,
      source2$,
      source3$,
      forkJoined$: forkJoin([source1$, source2$, source3$]),
    };
  }

  private getConcatExample() {
    const source1$ = interval(1000).pipe(
      take(1),
      map(() => 0)
    );
    const source2$ = interval(2000).pipe(
      take(1),
      map(() => 1)
    );
    const source3$ = interval(3000).pipe(
      take(1),
      map(() => 2)
    );
    return {
      source1$,
      source2$,
      source3$,
      result$: concat(source1$, source2$, source3$),
    };
  }

  private getZipExample() {
    const { start, transform } = this.starterFactory();
    const source1$ = transform(interval(1000).pipe(take(4)));
    const source2$ = transform(interval(2000).pipe(take(4)));
    const source3$ = transform(interval(3000).pipe(take(4)));
    return {
      start,
      source1$,
      source2$,
      source3$,
      zipped$: zip(source1$, source2$, source3$),
    };
  }

  private getCombineLatestExample() {
    const { start, transform } = this.starterFactory();
    const source1$ = transform(interval(1000).pipe(take(4)));
    const source2$ = transform(interval(2000).pipe(take(4)));
    const source3$ = transform(interval(3000).pipe(take(4)));
    return {
      start,
      source1$,
      source2$,
      source3$,
      combined$: combineLatest([source1$, source2$, source3$]),
    };
  }

  private getDelayed$(value: string | number, ms: number = 1000) {
    return of(value).pipe(delay(ms));
  }

  private starterFactory() {
    const starter = new Subject();
    return {
      start: () => {
        starter.next();
        starter.complete();
      },
      transform: (observable: Observable<any>) => {
        return starter.asObservable().pipe(switchMap(() => observable));
      },
    };
  }
}
