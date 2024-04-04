import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeWrapperComponent } from './components/homeWrapper/homeWrapper.component';

const routes: Routes = [
  {
    path: 'login',
    component: HomeWrapperComponent,
  },
  {
    path: 'signup',
    component: HomeWrapperComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
