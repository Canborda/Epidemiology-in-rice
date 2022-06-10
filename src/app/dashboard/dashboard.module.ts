import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { WrapperComponent } from './components/wrapper/wrapper.component';
import { MapComponent } from './components/map/map.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [WrapperComponent, MapComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // Ng Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
})
export class DashboardModule {}
