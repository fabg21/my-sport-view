import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginModule} from './login/login.module';
import {TokenInterceptor} from './common/interceptor/TokenInterceptor';
import {ShellModule} from './shell/shell.module';
import {AuthGuard} from './common/guard/auth.guard';
import {FinancialModule} from './financial/financial.module';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {ManagementModule} from './management/management.module';
import { ErrorComponent } from './error/error.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
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
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
