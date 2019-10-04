import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { UserSelectionComponent } from './containers/user-selection/user-selection.component';
import { PokeapiService } from './services/pokeapi.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { StatisticBarsComponent } from './components/pokemon-table/statistic-bars/statistic-bars.component';
import { DataTableComponent } from './components/pokemon-table/data-table/data-table.component';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from './components/pokemon-table/filters/filters.component';
import { PaginationComponent } from './components/pokemon-table/pagination/pagination.component';
import { ConfigTableService } from './services/config-table.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserSelectionComponent,
    StatisticBarsComponent,
    DataTableComponent,
    FiltersComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [
    PokeapiService,
    ConfigTableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
