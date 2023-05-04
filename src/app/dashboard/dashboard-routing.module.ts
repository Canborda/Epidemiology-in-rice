import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardWrapperComponent } from './components/dashboardWrapper/dashboardWrapper.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
