import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule, MatButtonModule, MatIconModule, MatChipsModule } from '@angular/material';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// // guards
// import * as fromGuards from './guards';

// services
import * as fromServices from './services';

// store
import * as fromStore from './store';

const MATERIAL_COMPONENTS = [MatProgressBarModule, MatButtonModule, MatIconModule, MatChipsModule];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature('uploads', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects),
    MATERIAL_COMPONENTS
  ],
  providers: [...fromServices.services],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class FileUploadModule {}
