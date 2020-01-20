import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { TestBed } from '@angular/core/testing';

import { UploadFileEffect } from './upload-file.effect';
import { FileUploadService } from '../../services';

const fileUploadServiceMock = {
  localUploadFile: jest.fn()
};

describe('UploadFileEffect', () => {
  let effects: UploadFileEffect;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UploadFileEffect,
        provideMockActions(() => actions),
        {
          provide: FileUploadService,
          useValue: fileUploadServiceMock
        }
      ]
    })
      .compileComponents()
      .then(() => {
        effects = TestBed.get(UploadFileEffect);
        actions = TestBed.get(Actions);
      });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
