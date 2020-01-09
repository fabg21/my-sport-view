import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './core/shell/shell.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { FinancialComponent } from './features/financial/containers/financial/financial.component';
import {
  CreatePlayerComponent,
  CreateTeamComponent,
  EditPlayerComponent,
  EditTeamComponent,
  PlayerListComponent,
  SeasonComponent,
  TeamListComponent
} from './features/management/containers';
import { ErrorComponent } from './core/error/error.component';
import { SeasonsComponent } from './features/management/containers/seasons/seasons.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      authorities: []
    }
  },
  {
    path: '',
    component: ShellComponent,
    data: {
      authorities: []
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'financial',
        loadChildren: () =>
          import('./features/financial/financial.module').then(
            mod => mod.FinancialModule
          )
        // component: FinancialComponent,
        // data: {
        //   authorities: ['ROLE_ADMIN']
        // },
        // canActivate: [AuthGuard]
      },
      {
        path: 'management',
        loadChildren: () =>
          import('./features/management/management.module').then(
            mod => mod.ManagementModule
          )
        // component: FinancialComponent,
        // data: {
        //   authorities: ['ROLE_ADMIN']
        // },
        // canActivate: [AuthGuard]
      },
      {
        path: 'access-denied',
        component: ErrorComponent,
        data: {
          authorities: [],
          pageTitle: 'error.title',
          error403: true
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
