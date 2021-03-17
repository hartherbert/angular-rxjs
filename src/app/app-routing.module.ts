import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CreateObservableComponent } from './lessons/create-observable.component';
import { SubjectComponent } from './lessons/subject.component';
import { CommonOperatorsComponent } from './lessons/common-operators.component';
import { MoreInfoComponent } from './lessons/more-info.component';
import { HomeComponent } from './home/home.component';
import { HttpClientComponent } from './lessons/http-client.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'create-observable',
        component: CreateObservableComponent,
      },
      {
        path: 'subject',
        component: SubjectComponent,
      },
      {
        path: 'common-operators',
        component: CommonOperatorsComponent,
      },
      {
        path: 'http-client',
        component: HttpClientComponent,
      },
      {
        path: 'more-info',
        component: MoreInfoComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
