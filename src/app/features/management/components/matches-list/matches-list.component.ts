import {Component, EventEmitter, Input, Output} from '@angular/core';

import {MatchModel} from '../../models/match.model';
import {OpposingTeamModel} from '../../models/opposingTeam.model';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent {
  @Input()
  matches: MatchModel[];

  @Input()
  opposingTeams: {id: number, value: OpposingTeamModel};

  @Input()
  title = 'matches';

  @Output() addMatchEvent = new EventEmitter();

  addMatch() {
    this.addMatchEvent.emit();
  }
}
