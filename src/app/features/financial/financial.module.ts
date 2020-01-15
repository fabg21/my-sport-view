import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { FinancialComponent } from './containers';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// state
import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

// routes
const routes: Routes = [
  {
    path: '',
    component: FinancialComponent,
    data: { authorities: ['ROLE_ADMIN'] }
    // canActivate: [AuthGuard]
  }
];

const MATERIAL = [MatTabsModule, MatTableModule];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL,
    RouterModule.forChild(routes),
    StoreModule.forFeature('financial', reducers),
    EffectsModule.forFeature(effects),
    FlexLayoutModule
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
  providers: [...fromServices.services]
})
export class FinancialModule {}
