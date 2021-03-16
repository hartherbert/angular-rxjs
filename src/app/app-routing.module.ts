import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CreateObservableComponent } from './lessons/create-observable.component';
import { SubjectComponent } from './lessons/subject.component';
import { CommonOperatorsComponent } from './lessons/common-operators.component';
import { MoreInfoComponent } from './lessons/more-info.component';
import { HomeComponent } from './home/home.component';

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
        path: 'more-info',
        component: MoreInfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
