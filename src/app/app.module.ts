import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppComponent } from './app.component';

import { FinancialModule } from './features/financial/financial.module';
import { ManagementModule } from './features/management/management.module';
import { CoreModule } from './core/core.module';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    FinancialModule,
    ManagementModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
