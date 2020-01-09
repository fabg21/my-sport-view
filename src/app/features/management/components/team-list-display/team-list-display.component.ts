import {Component, Input, OnInit} from '@angular/core';
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

  displayedColumns: string[] = ['id', 'name', 'logo'];

  constructor(
    private router: Router
  ) {}

  editTeam(row) {
    this.router.navigate(['/management/edit-team', row.id]);
  }
}
