import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginModule } from './login/login.module';
import { ShellModule } from './shell/shell.module';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/TokenInterceptor';
import { ErrorComponent } from './error/error.component';
import { RootStateModule } from './+state/root-state.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    FileUploadModule,
    ShellModule,
    FlexLayoutModule,
    RootStateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthGuard
  ]
})
export class CoreModule {}
