import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { BackendService } from '../../common/service/backend.service';
import { IncomingModel } from '../model/incoming.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class IncomingsService extends BackendService {

  servicesUrl = environment.servicesUrl;
  incomingUrl = this.servicesUrl + '/mysportfinancial/api/incomings';

  getAllIncomings(): Observable<IncomingModel[]> {
    return this.get<IncomingModel[]>(this.incomingUrl, false);
  }
}
