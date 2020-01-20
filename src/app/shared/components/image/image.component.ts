import { Observable, of } from 'rxjs';

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {
  @Input() imgSrc: Observable<string>;
}
