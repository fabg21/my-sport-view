import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppComponent } from './app.component';

import { ManagementModule } from './features/management/management.module';
import { CoreModule } from './core/core.module';
import {AppRoutingModule} from './app-routing.module';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    // FinancialModule,
    // ManagementModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
