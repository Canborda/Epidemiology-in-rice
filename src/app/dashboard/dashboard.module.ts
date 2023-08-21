import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
import { MatExpansionModule } from '@angular/material/expansion';

import { WrapperComponent } from './components/wrapper/wrapper.component';

import { MenuComponent } from './components/wrapper/menu/menu.component';
import { MapComponent } from './components/wrapper/map/map.component';
import { InfoComponent } from './components/wrapper/info/info.component';

import { MapDrawComponent } from './components/wrapper/menu/map-draw/map-draw.component';
import { MapListComponent } from './components/wrapper/menu/map-list/map-list.component';
import { MapAnalyzeComponent } from './components/wrapper/menu/map-analyze/map-analyze.component';
import { CropListComponent } from './components/wrapper/menu/crop-list/crop-list.component';
import { MapAddComponent } from './components/wrapper/map/map-add/map-add.component';

import { CellDialogComponent } from './components/wrapper/menu/crop-list/cell-dialog/cell-dialog.component';
import { AddDialogComponent } from './components/wrapper/menu/crop-list/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './components/wrapper/menu/crop-list/delete-dialog/delete-dialog.component';

import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    WrapperComponent,
    MenuComponent,
    MapComponent,
    InfoComponent,
    MapDrawComponent,
    MapListComponent,
    MapAnalyzeComponent,
    CropListComponent,
    MapAddComponent,
    CellDialogComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    ChartComponent,
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
    MatExpansionModule,
  ],
})
export class DashboardModule {}
