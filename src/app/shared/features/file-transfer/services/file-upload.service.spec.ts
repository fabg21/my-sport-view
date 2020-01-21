import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { TransferFileService } from './transfer-file.service';
import { BucketDestination } from '../models';

describe('TransferFileService', () => {
  let service: TransferFileService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            request: () => null
          }
        },
        TransferFileService
      ]
    }).compileComponents();
    service = TestBed.get(TransferFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('HTTP Upload', () => {
    it('should upload file call http request method', () => {
      const spy = spyOn(service['http'], 'request');

      const content = ['<p>', 'some', 'parts', 'of', 'a', 'file', '</p>'];
      const file = new File(content, 'testfile', { type: 'text/html' });
      service.uploadFile(file, BucketDestination.AVATARS);

      expect(spy).toHaveBeenCalled();
    });
  });
});
