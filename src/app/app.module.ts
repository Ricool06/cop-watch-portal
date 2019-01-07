import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StopAndSearchEffects } from './effects/stop-and-search.effects';
import { MapViewComponent } from './components/presentational/map-view/map-view.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/smart/map/map.component';

@NgModule({
  declarations: [AppComponent, MapComponent, MapViewComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([StopAndSearchEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
