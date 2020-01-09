import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PlayersService, TeamsService} from '../../services';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnDestroy {

  alive = true;

  constructor(
    private router: Router,
    private teamsService: TeamsService,
    private store: Store<fromStore.ManagementState>
  ) {}

  cancelCreateTeam() {
    this.router.navigateByUrl('/management/teams');
  }

  createTeam(teamData) {
    teamData.logo = 'https://api.adorable.io/avatars/285/bad@adorable.io.png';
    this.teamsService.createTeam(teamData).pipe(
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
