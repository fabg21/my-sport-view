import { Observable } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { TeamModel } from '../../models/team.model';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {
  team$: Observable<TeamModel>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.ManagementState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.team$ = this.store.pipe(
      select(fromStore.getSelectedTeam),
    );
  }

  cancelEditTeam() {
    this.router.navigateByUrl('/management/teams');
  }

  editTeam(teamData) {
    teamData.logo = 'https://api.adorable.io/avatars/285/bad@adorable.io.png';
    this.store.dispatch(new fromStore.EditTeam({teamData}));
  }
}
