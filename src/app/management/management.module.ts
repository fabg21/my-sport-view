import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule,
  MatTableModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { reducers, effects } from './store';
import {HasAnyAuthorityDirective} from '../common/auth/has-any-authority.directive';

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
    StoreModule.forFeature('management', reducers),
    EffectsModule.forFeature(effects),
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTableModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components, HasAnyAuthorityDirective],
  exports: [...fromContainers.containers, ...fromComponents.components],
  providers: [...fromServices.services]
})
export class ManagementModule {}
