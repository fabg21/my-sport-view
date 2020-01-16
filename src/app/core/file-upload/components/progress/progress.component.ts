import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gat-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() color = 'primary';
  @Input() mode = 'determinate';
  @Input() progress = 0;

  constructor() {}

  ngOnInit() {}
}
