import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'src/environments/environment';
import * as fromReducers from './reducers';
import * as fromEffects from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(fromReducers.reducers, {
      metaReducers: fromReducers.metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(fromEffects.effects),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 80
        })
      : []
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: fromReducers.CustomSerializer }
  ]
})
export class RootStateModule {}
