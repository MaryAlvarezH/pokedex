import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { UserSelectionComponent } from './containers/user-selection/user-selection.component';
import { UserSelectionViewComponent } from './components/user-selection-view/user-selection-view.component';
import { PokeapiService } from './services/pokeapi.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PokemonStatisticsComponent } from './components/pokemon-statistics/pokemon-statistics.component';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserSelectionComponent,
    UserSelectionViewComponent,
    PokemonStatisticsComponent,
    PokemonTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [
    PokeapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
