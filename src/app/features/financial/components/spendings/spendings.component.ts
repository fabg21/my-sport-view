import {Component, Input} from '@angular/core';
import {SpendingsModel} from '../../model/spendings.model';
import {ObservableInput} from 'observable-input';
import {Observable} from 'rxjs';

@Component({
  selector: ' app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.scss']
})
export class SpendingsComponent {
  @Input()
  @ObservableInput()
  spendings$: Observable<SpendingsModel[]>;

  displayedColumns: string[] = ['id', 'label', 'amount', 'status', 'category'];
}
