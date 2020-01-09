import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import * as fromStore from '../../store';
import {TeamsService} from '../../services';
import {TeamModel} from '../../models/team.model';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit, OnDestroy {

  teams$: Observable<TeamModel[]>;
  alive = true;

  constructor(
    private store: Store<fromStore.ManagementState>,
    private router: Router,
    private teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.teams$ = this.store.select(fromStore.getAllTeams);
    this.store.dispatch(new fromStore.LoadTeams());
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  newTeam() {
    this.router.navigateByUrl('/create-team');
  }

  delete(id) {
    this.teamsService.deleteTeam(id).pipe(
      takeWhile(() => this.alive),
    ).subscribe(x => this.store.dispatch(new fromStore.LoadTeams()));
  }

  modify(team: TeamModel) {
    this.router.navigate(['/edit-team', team.id]);
  }

}
