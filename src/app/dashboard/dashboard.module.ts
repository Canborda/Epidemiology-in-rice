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
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { DialogAddComponent } from './components/common/dialog-add/dialog-add.component';
import { DialogDeleteComponent } from './components/common/dialog-delete/dialog-delete.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';

import { MenuComponent } from './components/wrapper/menu/menu.component';
import { MapComponent } from './components/wrapper/map/map.component';
import { InfoComponent } from './components/wrapper/info/info.component';

import { MapDrawComponent } from './components/wrapper/menu/map-draw/map-draw.component';
import { MapSelectComponent } from './components/wrapper/menu/map-select/map-select.component';
import { MapAnalyzeComponent } from './components/wrapper/menu/map-analyze/map-analyze.component';
import { StandardsConfigComponent } from './components/wrapper/menu/standards-config/standards-config.component';
import { AdminVarietiesComponent } from './components/wrapper/menu/admin-varieties/admin-varieties.component';
import { AdminClustersComponent } from './components/wrapper/menu/admin-clusters/admin-clusters.component';
import { UserConfigComponent } from './components/wrapper/menu/user-config/user-config.component';
import { MapAddComponent } from './components/wrapper/map/map-add/map-add.component';
import { CropInfoComponent } from './components/wrapper/info/crop-info/crop-info.component';
import { IndexInfoComponent } from './components/wrapper/info/index-info/index-info.component';
import { MessageInfoComponent } from './components/wrapper/info/message-info/message-info.component';

import { ChartComponent } from './components/wrapper/info/index-info/chart/chart.component';

@NgModule({
  declarations: [
    DialogAddComponent,
    DialogDeleteComponent,
    WrapperComponent,
    MenuComponent,
    MapComponent,
    InfoComponent,
    MapDrawComponent,
    MapSelectComponent,
    MapAnalyzeComponent,
    StandardsConfigComponent,
    AdminVarietiesComponent,
    AdminClustersComponent,
    UserConfigComponent,
    MapAddComponent,
    CropInfoComponent,
    IndexInfoComponent,
    MessageInfoComponent,
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
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
  ],
})
export class DashboardModule { }
