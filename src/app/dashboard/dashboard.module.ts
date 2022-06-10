import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';

import { WrapperComponent } from './components/wrapper/wrapper.component';
import { MapComponent } from './components/map/map.component';
import { ChartComponent } from './components/chart/chart.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [WrapperComponent, MapComponent, ChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HighchartsChartModule,
    // Ng Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
  ],
})
export class DashboardModule {}
