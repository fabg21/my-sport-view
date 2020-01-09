import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';
import { SpendingsModel } from '../model/spendings.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SpendingsService extends BackendService {
  servicesUrl = environment.servicesUrl;
  spendingsUrl = this.servicesUrl + '/mysportfinancial/api/spendings';

  getAllSpendings(): Observable<SpendingsModel[]> {
    return this.get<SpendingsModel[]>(this.spendingsUrl, false);
  }
}
