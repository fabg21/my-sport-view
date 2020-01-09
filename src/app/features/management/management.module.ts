import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatTableModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../../core/guards/auth.guard';
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
    path: 'players',
    component: fromContainers.PlayerListComponent,
    data: {
      authorities: []
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create-player',
    component: fromContainers.CreatePlayerComponent,
    data: {
      authorities: []
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-player/:id',
    component: fromContainers.EditPlayerComponent,
    data: {
      authorities: []
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'teams',
    component: fromContainers.TeamListComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create-team',
    component: fromContainers.CreateTeamComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-team/:id',
    component: fromContainers.EditTeamComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'seasons',
    component: fromContainers.SeasonsComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create-season',
    component: fromContainers.CreateSeasonComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'season/:id',
    component: fromContainers.SeasonComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    // HasAnyAuthorityDirective
  ],
  exports: [
    ...fromContainers.containers,
    ...fromComponents.components,
  ],
  providers: [...fromServices.services]
})
export class ManagementModule {}
