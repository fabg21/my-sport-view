import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-calendar-workspace',
  templateUrl: './calendar-workspace.component.html',
  styleUrls: ['./calendar-workspace.component.scss']
})
export class CalendarWorkspaceComponent {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  opened: boolean;

  close() {
    this.sidenav.close();
  }

  openDrawer() {
    this.sidenav.open();
  }
}
