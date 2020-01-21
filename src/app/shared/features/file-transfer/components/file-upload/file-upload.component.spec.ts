import { of } from 'rxjs';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { generateFileList } from '../../utils';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    component.reset = of(undefined);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emitFile emit a fileUpload event containing first element of the FileList', () => {
    const spy = jest.spyOn(component.fileUploaded, 'emit');

    const list: FileList = generateFileList();
    const expected = [list.item(0)];
    component.emitFiles(list);

    expect(spy).toHaveBeenCalledWith(expected);
  });

  it('should cancel attachment', () => {
    const spy = jest.spyOn(component.cancelAttachment, 'emit');
    const filename = 'testFile.json';

    component.cancelAttachment(filename);

    const actualElementValue = component.fileInput.nativeElement.value;
    expect(spy).toHaveBeenCalledWith(filename);
    expect(actualElementValue).toEqual('');
  });

  it('should contain ControlValueAccessor methods', () => {
    expect(component.writeValue).toBeDefined();
    expect(component.registerOnTouched).toBeDefined();
    expect(component.registerOnChange).toBeDefined();
  });

  it('should implement writeValue', () => {
    component.writeValue(null);

    const actualNodeValue = component['host'].nativeElement.nodeValue;
    const actualFile = component.files;

    expect(actualNodeValue).toBeFalsy();
    expect(actualFile).toEqual(null);
  });

  it('should implement registerOnChange', () => {
    const dummyFn = function() {};

    component.registerOnChange(dummyFn);
    fixture.detectChanges();

    const actualOnChange = component.onChange;

    expect(actualOnChange).toEqual(dummyFn);
  });
});
