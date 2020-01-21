import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSelectModule, MatSidenavModule,
  MatSlideToggleModule,
  MatTableModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { CreateMatchFormComponent } from './containers';

// import {AuthGuard} from 'src/app/core/guards/auth.guard';
import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {AmazingTimePickerModule} from 'amazing-time-picker';

// routes
const routes: Routes = [
  {
    path: 'players',
    component: fromContainers.PlayerListComponent,
    data: {
      authorities: []
    }
    // canActivate: [AuthGuard]
  },
  {
    path: 'create-player',
    component: fromContainers.CreatePlayerComponent,
    data: {
      authorities: []
    }
    // canActivate: [AuthGuard]
  },
  {
    path: 'edit-player',
    component: fromContainers.EditPlayerComponent,
    data: {
      authorities: []
    }
    // canActivate: [AuthGuard]
  },
  {
    path: 'teams',
    component: fromContainers.TeamListComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    }
    // canActivate: [AuthGuard]
  },
  {
    path: 'create-team',
    component: fromContainers.CreateTeamComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    }
    // canActivate: [AuthGuard]
  },
  {
    path: 'edit-team',
    component: fromContainers.EditTeamComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    }
    // canActivate: [AuthGuard]
  },
  {
    path: 'seasons',
    component: fromContainers.SeasonsComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    }
    // canActivate: [AuthGuard]
  },
  {
    path: 'create-season',
    component: fromContainers.CreateSeasonComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    }
    // canActivate: [AuthGuard]
  },
  {
    path: 'season',
    component: fromContainers.SeasonComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    }
    // canActivate: [AuthGuard]
  },
  {
    path: 'calendar',
    component: fromComponents.CalendarWorkspaceComponent,
    data: {
      authorities: ['ROLE_ADMIN']
    }
    // canActivate: [AuthGuard]
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
    MatSelectModule,
    MatChipsModule,
    MatSlideToggleModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    AmazingTimePickerModule,
    MatSidenavModule,
    SharedModule
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
  providers: [...fromServices.services],
})
export class ManagementModule {}
