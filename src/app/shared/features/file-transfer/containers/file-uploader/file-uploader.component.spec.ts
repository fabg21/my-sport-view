import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

import { FileUploaderComponent } from './file-uploader.component';

import { UploadRequest } from '../../store/actions/upload-file.action';
import { BucketDestination } from '../../models';

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
            dispatch: () => null,
            pipe: () => of(null),
            select: () => of(null)
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

  it('should upload file over http', () => {
    const file = new File([''], 'test.txt');
    const destination = BucketDestination.DOCUMENTS;
    const ownerId = 'blarf';

    const store = TestBed.get(Store);
    const spy = spyOn(store, 'dispatch');
    const action = new UploadRequest({ file, destination, ownerId });

    fixture.detectChanges();

    component.uploadFile([file]);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not cancel attachment when standalone is true', () => {
    const name = 'test.json';
    const store = TestBed.get(Store);
    const spy = spyOn(store, 'dispatch');

    fixture.detectChanges();

    component.cancelAttachment(name);

    expect(spy).not.toHaveBeenCalled();
  });
});
