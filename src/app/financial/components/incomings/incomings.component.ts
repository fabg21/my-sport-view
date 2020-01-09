import {Component, Input} from '@angular/core';
import {IncomingModel} from '../../model/incoming.model';
import {ObservableInput} from 'observable-input';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-incomings',
  templateUrl: './incomings.component.html',
  styleUrls: ['./incomings.component.scss']
})
export class IncomingsComponent {
  @Input()
  @ObservableInput()
  incomings$: Observable<IncomingModel[]>;

  displayedColumns: string[] = ['id', 'label', 'amount', 'status', 'category'];
}
