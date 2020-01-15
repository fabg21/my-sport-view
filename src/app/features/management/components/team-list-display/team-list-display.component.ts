import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {TeamModel} from '../../models/team.model';
import {ObservableInput} from 'observable-input/lib';
import {Router} from '@angular/router';

@Component({
  selector: 'app-team-list-display',
  templateUrl: './team-list-display.component.html',
  styleUrls: ['./team-list-display.component.scss']
})
export class TeamListDisplayComponent {

  @Input()
  @ObservableInput()
  teams$: Observable<TeamModel[]>;

  @Output()
  editEvent = new EventEmitter<number>();

  displayedColumns: string[] = ['id', 'name', 'logo'];

  constructor(
    private router: Router
  ) {}

  editTeam(idRow) {
    this.editEvent.emit(idRow);
  }
}
