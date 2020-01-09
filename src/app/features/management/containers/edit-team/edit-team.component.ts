import { Observable } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { TeamsService } from '../../services';
import { TeamModel } from '../../models/team.model';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit, OnDestroy {
  alive = true;
  selectedId: number;
  team$: Observable<TeamModel>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.ManagementState>,
    private router: Router,
    private teamsService: TeamsService,
  ) { }

  ngOnInit() {
    this.team$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = + params.get('id');
        return this.store.pipe(
          select(fromStore.getSelectedTeam, { id: this.selectedId })
        );
      })
    );
  }

  cancelEditTeam() {
    this.router.navigateByUrl('/management/teams');
  }

  editTeam(teamData) {
    teamData.id = this.selectedId;
    teamData.logo = 'https://api.adorable.io/avatars/285/bad@adorable.io.png';
    this.teamsService.editTeam(teamData).pipe(
      takeWhile(() => this.alive)
    ).subscribe(
      x => {
        this.store.dispatch(new fromStore.LoadTeams());
        this.router.navigateByUrl('/management/teams');
      }
    );
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
