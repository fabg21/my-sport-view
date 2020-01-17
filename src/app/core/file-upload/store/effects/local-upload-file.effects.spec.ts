import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';

import { TestBed } from '@angular/core/testing';

import { LocalUploadFileEffects } from './local-upload-file.effects';
import { FileUploadService } from '../../services';
import { LocalUploadRequest, LocalUploadMaxTotalSizeExceededFailure } from '../actions/local-upload-file.action';
import { generateLocalFile } from '../../utils';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';

const fileUploadServiceMock = {
  localUploadFile: jest.fn()
};

const storeMock = {
  pipe: jest.fn()
};

describe('LocalUploadFileEffects', () => {
  let effects: LocalUploadFileEffects;
  let actions: Observable<any>;
  let store: Store<any>;
  let localUploadService: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalUploadFileEffects,
        provideMockActions(() => actions),
        {
          provide: FileUploadService,
          useValue: fileUploadServiceMock
        },
        {
          provide: Store,
          useValue: storeMock
        }
      ]
    })
      .compileComponents()
      .then(() => {
        effects = TestBed.get(LocalUploadFileEffects);
        actions = TestBed.get(Actions);
        store = TestBed.get(Store);
        localUploadService = TestBed.get(FileUploadService);
      });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  xit('should fail to upload a local file due to exceeded total size', () => {
    const exceeded = true;
    const action = new LocalUploadRequest({} as any);
    const outcome = new LocalUploadMaxTotalSizeExceededFailure({ error: 'The upload exceeds the authorized size.' });
    const localFile = generateLocalFile();
    localFile.size = 1234;

    store.pipe = jest.fn(() => of(exceeded));

    actions = hot('-a', { a: action });
    const responseFile = cold('-a|', { a: localFile });
    const expected = cold('--b', { b: outcome });

    localUploadService.localUploadFile = jest.fn(() => responseFile);

    expect(effects.localUploadRequestEffect$).toBeObservable(expected);
  });
});
