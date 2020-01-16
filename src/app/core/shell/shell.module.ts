import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ShellComponent } from './shell.component';
import { AppRoutingModule } from '../../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { FileUploadModule } from '../file-upload/file-upload.module';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FileUploadModule
  ],
  declarations: [ShellComponent],
  exports: [ShellComponent],
  providers: []
})
export class ShellModule {}
