import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';

import { DashboardWrapperComponent } from './components/dashboardWrapper/dashboardWrapper.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';
import { ChartComponent } from './components/chart/chart.component';
import { MapDrawComponent } from './modals/map-draw/map-draw.component';
import { MapAddComponent } from './modals/map-add/map-add.component';
import { MapListComponent } from './modals/map-list/map-list.component';
import { MapImageComponent } from './modals/map-image/map-image.component';
import { CropListComponent } from './modals/crop-list/crop-list.component';
import { CellDialogComponent } from './common/cell-dialog/cell-dialog.component';
import { AddDialogComponent } from './common/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './common/delete-dialog/delete-dialog.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardWrapperComponent,
    MenuComponent,
    MapComponent,
    ChartComponent,
    MapDrawComponent,
    MapAddComponent,
    MapListComponent,
    MapImageComponent,
    CropListComponent,
    CellDialogComponent,
    AddDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    HighchartsChartModule,
    // Ng Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
  ],
})
export class DashboardModule {}
