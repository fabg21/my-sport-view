import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Observable} from 'rxjs';
import {IncomingModel} from '../../model/incoming.model';
import {SpendingsModel} from '../../model/spendings.model';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {

  incomings$: Observable<IncomingModel[]>;
  spendings$: Observable<SpendingsModel[]>;

  constructor(private store: Store<fromStore.FinancialState>) { }

  ngOnInit() {
    this.incomings$ = this.store.select(fromStore.getAllIncomings);
    this.spendings$ = this.store.select(fromStore.getAllSpendings);
    this.store.dispatch(new fromStore.LoadIncomings());
    this.store.dispatch(new fromStore.LoadSpendings());
  }
}
