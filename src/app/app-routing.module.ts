import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
  // NoPreloading,
  // PreloadAllModules
} from '@angular/router';

import { ShellComponent } from './core/shell/shell.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ErrorComponent } from './core/error/error.component';

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
      },
      {
        path: 'management',
        loadChildren: () =>
          import('./features/management/management.module').then(
            mod => mod.ManagementModule
          )
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
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
      // preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
