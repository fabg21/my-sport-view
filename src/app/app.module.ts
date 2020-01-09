import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './core/interceptors/TokenInterceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginModule } from './core/login/login.module';
import { ShellModule } from './core/shell/shell.module';

import { FinancialModule } from './features/financial/financial.module';
import { ManagementModule } from './features/management/management.module';
import { ErrorComponent } from './core/error/error.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    ShellModule,
    FlexLayoutModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    FinancialModule,
    ManagementModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
