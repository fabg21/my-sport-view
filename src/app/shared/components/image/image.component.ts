import { Observable, of } from 'rxjs';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnInit {
  @Input() imgSrc: string | Observable<string>;

  constructor() {}

  ngOnInit() {
    if (this.imgSrc && typeof this.imgSrc === 'string') {
      this.imgSrc = of(this.imgSrc);
    }
  }
}
