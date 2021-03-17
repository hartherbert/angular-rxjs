import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

interface IUser {
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
  type: 'User';
  site_admin: false;
}

@Component({
  selector: 'app-http-client',
  template: `
    <div class="single-card-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Users</mat-card-title>
          <mat-card-subtitle
            >Hit the "Load users" button to load a list of github users using
            observables.</mat-card-subtitle
          >
        </mat-card-header>

        <mat-list *ngIf="users$ | async as users">
          <mat-list-item *ngFor="let user of users">
            <img
              matListAvatar
              [src]="user.avatar_url"
              alt="image of {{ user.login }}"
            />
            <div mat-line>{{ user.login }}</div>
          </mat-list-item>
        </mat-list>

        <mat-card-actions>
          <button mat-button (click)="getUsers()">Load users</button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Single user</mat-card-title>
          <mat-card-subtitle
            >Start typing a github username and search for a specific
            user.</mat-card-subtitle
          >
        </mat-card-header>

        <mat-form-field style="width: 250px;">
          <mat-label>Github username</mat-label>
          <input #userInput matInput />
        </mat-form-field>

        <p>Or choose one below.</p>
        <mat-chip-list>
          <mat-chip
            *ngFor="let username of userExampleList"
            (click)="setUsername(username)"
            >{{ username }}</mat-chip
          >
        </mat-chip-list>

        <mat-nav-list>
          <a
            mat-list-item
            *ngIf="user$ | async as user; else notFoundUser"
            (click)="goToUserProfile(user.html_url)"
          >
            <img
              matListAvatar
              [src]="user.avatar_url"
              alt="image of {{ user.login }}"
            />
            <div mat-line>{{ user.login }}</div>
          </a>

          <ng-template #notFoundUser>
            <mat-list-item>
              <img
                matListAvatar
                src="https://avatars.githubusercontent.com/u/10137?v=4"
              />
              <div mat-line>No user found</div>
            </mat-list-item>
          </ng-template>
        </mat-nav-list>
      </mat-card>
    </div>
  `,
  styles: [],
})
export class HttpClientComponent implements AfterViewInit, OnDestroy {
  @ViewChild('userInput') private readonly userInput!: ElementRef<
    HTMLInputElement
  >;

  public users$!: Observable<IUser[]>;
  public user$!: Observable<IUser | undefined>;

  public userExampleList = [
    'geoinfo-applications',
    'bschaepper',
    'meyraa',
    'hobbydevs',
  ];

  private destroy$ = new Subject();
  private getUrl = (path: string) => `https://api.github.com${path}`;

  constructor(private readonly httpClient: HttpClient) {}

  public ngAfterViewInit(): void {
    this.user$ = fromEvent(this.userInput.nativeElement, 'keyup').pipe(
      takeUntil(this.destroy$),
      debounceTime(150),
      map(() => this.userInput.nativeElement.value),
      distinctUntilChanged(),
      filter(Boolean),
      switchMap((username) =>
        this.httpClient.get<IUser>(this.getUrl(`/users/${username}`)).pipe(
          catchError(() => {
            return of(undefined);
          })
        )
      )
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getUsers(): void {
    this.users$ = this.httpClient.get<IUser[]>(this.getUrl('/users'));
  }

  public setUsername(username: string): void {
    this.userInput.nativeElement.value = username;
    this.userInput.nativeElement.dispatchEvent(new KeyboardEvent('keyup'));
  }

  public goToUserProfile(url: string): void {
    window.open(url, '_blank');
  }
}
