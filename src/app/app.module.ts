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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MapComponent } from './components/smart/map/map.component';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataSheetComponent } from './components/presentational/data-sheet/data-sheet.component';
import { MomentModule } from 'ngx-moment';
import { MatTableModule, MatBottomSheetModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, MapComponent, MapViewComponent, DataSheetComponent],
  entryComponents: [DataSheetComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
    }) : [],
    EffectsModule.forRoot([StopAndSearchEffects]),
    MatTableModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MomentModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true,
  },
  {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: { duration: 4000 },
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
