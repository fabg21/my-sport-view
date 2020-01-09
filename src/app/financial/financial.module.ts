import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import {MatTabsModule} from '@angular/material/tabs';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTableModule} from '@angular/material';
import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

// routes


@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    StoreModule.forFeature('financial', reducers),
    EffectsModule.forFeature(effects),
    FlexLayoutModule,
    MatTableModule
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
  providers: [...fromServices.services]
})
export class FinancialModule {}
