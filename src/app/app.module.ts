import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { PokemonCardComponent } from './containers/pokemon-card/pokemon-card.component';
import { UserSelectionComponent } from './containers/user-selection/user-selection.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { PokemonCardViewComponent } from './components/pokemon-card-view/pokemon-card-view.component';
import { UserSelectionViewComponent } from './components/user-selection-view/user-selection-view.component';
import { PokeapiService } from './services/pokeapi.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PokemonCardComponent,
    UserSelectionComponent,
    DashboardViewComponent,
    PokemonCardViewComponent,
    UserSelectionViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    PokeapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
