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

import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../core/guards/auth.guard';
import {PlayerListComponent} from './containers';
import {CreatePlayerComponent} from './containers';
import {EditPlayerComponent} from './containers';
import {TeamListComponent} from './containers';
import {CreateTeamComponent} from './containers';
import {EditTeamComponent} from './containers';
import {SeasonsComponent} from './containers';
import {SeasonComponent} from './containers';

// routes
const routes: Routes = [
  {
    path: 'players',
    component: PlayerListComponent,
    data: {
      authorities: []
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create-player',
    component: CreatePlayerComponent,
    data: {
      authorities: []
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-player/:id',
    component: EditPlayerComponent,
    data: {
      authorities: []
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'teams',
    component: TeamListComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create-team',
    component: CreateTeamComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-team/:id',
    component: EditTeamComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'seasons',
    component: SeasonsComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'season/:id',
    component: SeasonComponent,
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
    ...fromComponents.components
    // HasAnyAuthorityDirective
  ],
  exports: [...fromContainers.containers, ...fromComponents.components],
  providers: [...fromServices.services]
})
export class ManagementModule {}
