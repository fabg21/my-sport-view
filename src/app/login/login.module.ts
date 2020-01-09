import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import {LoginComponent} from './login.component';
import { AccountService } from '../common/service/account.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, RouterModule, FlexLayoutModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [AccountService]
})
export class LoginModule {}
