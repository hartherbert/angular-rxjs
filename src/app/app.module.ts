import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CreateObservableComponent } from './lessons/create-observable.component';
import { MatChipsModule } from '@angular/material/chips';
import { ObservablePrinterComponent } from './observable-printer/observable-printer.component';
import { MatCardModule } from '@angular/material/card';
import { SubjectComponent } from './lessons/subject.component';
import { CommonOperatorsComponent } from './lessons/common-operators.component';
import { MoreInfoComponent } from './lessons/more-info.component';
import { HomeComponent } from './home/home.component';
import { HttpClientComponent } from './lessons/http-client.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CreateObservableComponent,
    ObservablePrinterComponent,
    SubjectComponent,
    CommonOperatorsComponent,
    MoreInfoComponent,
    HomeComponent,
    HttpClientComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
