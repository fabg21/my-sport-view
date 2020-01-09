import {Component, Input, OnInit} from '@angular/core';
import {ObservableInput} from 'observable-input';
import {combineLatest, Observable} from 'rxjs';
import {IncomingModel} from '../../model/incoming.model';
import {SpendingsModel} from '../../model/spendings.model';
import {map, reduce} from 'rxjs/operators';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  @Input()
  @ObservableInput()
  incomings$: Observable<IncomingModel[]>;

  @Input()
  @ObservableInput()
  spendings: Observable<SpendingsModel[]>;

  totalIncomings$: Observable<number>
  totalSpendings$: Observable<number>;
  total$: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.totalIncomings$ = this.incomings$.pipe(
      map((incomings: IncomingModel[]) => incomings.reduce((total, incoming) => total + incoming.amount, 0))
    );
    this.totalSpendings$ = this.spendings.pipe(
      map((spendings: SpendingsModel[]) => spendings.reduce((total, spending) => total + spending.amount, 0))
    );
    this.total$ = combineLatest(this.totalIncomings$, this.totalSpendings$).pipe(
      map(([totalIncomings, totalSpendings]) => totalIncomings - totalSpendings)
    );
  }

}
