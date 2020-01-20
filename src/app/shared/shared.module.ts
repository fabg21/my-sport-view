import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './components/image/image.component';
import { HasAnyAuthorityDirective } from './directives/has-any-authority.directive';
import { FileUploadModule } from './features/file-upload/file-upload.module';

const COMPONENTS = [ImageComponent];
const DIRECTIVES = [HasAnyAuthorityDirective];
const SHARED_FEATURES = [FileUploadModule];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [CommonModule, ...SHARED_FEATURES],
  exports: [...COMPONENTS, ...DIRECTIVES, ...SHARED_FEATURES]
})
export class SharedModule {}