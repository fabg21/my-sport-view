import { Observable } from 'rxjs';
import { getTestScheduler } from 'jasmine-marbles';

import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { FileUploadService } from './file-upload.service';
import { generateFile, generateLocalFile } from '../utils';

describe('FileUploadService', () => {
  let service: FileUploadService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            request: () => jest.fn()
          }
        },
        FileUploadService
      ]
    }).compileComponents();
    service = TestBed.get(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('HTTP Upload', () => {
    it('should upload file call http request method', () => {
      const spy = jest.spyOn(service['http'], 'request');

      const content = ['<p>', 'some', 'parts', 'of', 'a', 'file', '</p>'];
      const file = new File(content, 'testfile', { type: 'text/html' });
      service.uploadFile(file);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('LOCAL Upload', () => {
    it('should upload file should return an observable', () => {
      const content = ['<p>', 'some', 'parts', 'of', 'a', 'file', '</p>'];
      const file = generateFile(content, 'test.txt', { type: 'text/html' });
      const result = service.localUploadFile([file]);

      expect(result).toBeInstanceOf(Observable);
    });

    it('should upload file should first emit a progress event', done => {
      const content = ['<p>', 'some ', 'parts ', 'of ', 'a ', 'file', '</p>'];
      const file = generateFile(content, 'test.txt', { type: 'text/html' });

      const fromFile = generateLocalFile(file);
      const expectedStart = {
        ...fromFile,
        data: {
          status: 'Started',
          type: 'progress',
          progress: 100
        }
      };
      service.localUploadFile([file]).subscribe(event => {
        expect(event).toEqual(expectedStart);
        done();
      });

      getTestScheduler().flush();
    });
    it('should upload file should finish with a `complete` event', () => {
      const content = ['<p>', 'some ', 'parts ', 'of ', 'a ', 'file', '</p>'];
      const file = generateFile();

      const fromFile = generateLocalFile(file);

      const expectedComplete = {
        ...fromFile,
        data: {
          status: 'Completed',
          type: '',
          data: btoa(content.join(''))
        }
      };
      service.localUploadFile([file]).subscribe(event => {
        expect(event).toEqual(expectedComplete);
      });

      getTestScheduler().flush();
    });

    it('should local upload infer mime type from file name if no type is specified', done => {
      const file = new File([''], 'test.pdf');
      const expectedType = 'application/pdf';
      service.localUploadFile([file]).subscribe(event => {
        const fileType = event.type;
        expect(fileType).toEqual(expectedType);
        done();
      });

      getTestScheduler().flush();
    });
  });
});
