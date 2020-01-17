import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { FileUploaderComponent } from './file-uploader.component';

import { UploadRequest } from '../../store/actions/remote-upload-file.action';
import {
  LocalUploadRequest,
  LocalUploadCancel,
  LocalUploadUpdateMaxTotalFilesSize
} from '../../store/actions/local-upload-file.action';

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderComponent],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn(() => of(null)),
            select: jest.fn(() => of(null))
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload file locally when standalone is false', () => {
    const files = [new File([''], 'test.txt')];
    const store = TestBed.get(Store);
    const spy = jest.spyOn(store, 'dispatch');

    const action = new LocalUploadRequest({ files });

    component.uploadFile(files);

    expect(component.standalone).toEqual(false);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should upload file over http when standalone is true', () => {
    const file = new File([''], 'test.txt');
    const store = TestBed.get(Store);
    const spy = jest.spyOn(store, 'dispatch');

    const action = new UploadRequest({ file });

    component.standalone = true;

    fixture.detectChanges();

    component.uploadFile([file]);

    expect(component.standalone).toEqual(true);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should cancel local attachment when standalone is false', () => {
    const name = 'test.json';
    const store = TestBed.get(Store);
    const spy = jest.spyOn(store, 'dispatch');

    const action = new LocalUploadCancel({ name });
    component.cancelAttachment(name);

    expect(component.standalone).toEqual(false);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not cancel attachment when standalone is true', () => {
    const name = 'test.json';
    const store = TestBed.get(Store);
    const spy = jest.spyOn(store, 'dispatch');

    component.standalone = true;

    fixture.detectChanges();

    component.cancelAttachment(name);

    expect(component.standalone).toEqual(true);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update the max disk size', () => {
    const maxSize = 1234;
    const store = TestBed.get(Store);
    const spy = jest.spyOn(store, 'dispatch');
    const expected = new LocalUploadUpdateMaxTotalFilesSize(maxSize);

    component.maxTotalFilesSize$ = of(maxSize);

    fixture.detectChanges();
    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(expected);
  });
});
