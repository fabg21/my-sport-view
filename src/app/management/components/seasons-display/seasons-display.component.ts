import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ObservableInput } from 'observable-input/lib';

import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { SeasonModel } from '../../models/season.model';
import { TeamModel } from '../../models/team.model';

export interface SeasonByTeamModel {
  team: TeamModel;
  seasons: SeasonModel[];
}

@Component({
  selector: 'app-seasons-display',
  templateUrl: './seasons-display.component.html',
  styleUrls: ['./seasons-display.component.scss']
})
export class SeasonsDisplayComponent implements OnInit {

  @Input()
  @ObservableInput()
  seasons$: Observable<SeasonModel[]>;

  @Input()
  @ObservableInput()
  teams$: Observable<TeamModel[]>;

  seasonsByTeam$: Observable<SeasonByTeamModel[]>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.seasonsByTeam$ = combineLatest(this.teams$, this.seasons$).pipe(
      map(([teams, seasons]) => {
        return toSeasonsByTeams(teams, seasons);
      }),
      tap(seasonsByTeam => console.log('FMN : seasonsByTeam', seasonsByTeam))
    );
  }

  configureSeason(seasonId) {
    this.router.navigate(['/season', seasonId]);
  }
}

const toSeasonsByTeams = (teamsArray: TeamModel[], seasonsArray: SeasonModel[], ) => {
  return teamsArray.reduce((seasonsByTeams: SeasonByTeamModel[], team) => {
    const seasons: SeasonModel[] = seasonsArray.filter(s => s.teamIdId === team.id);
    return [...seasonsByTeams, { team, seasons }] as SeasonByTeamModel[];
  }, []);
};
