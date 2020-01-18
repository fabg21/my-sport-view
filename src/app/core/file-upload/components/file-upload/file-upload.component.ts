import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() progress: number;
  @Input() reset: Observable<void>;
  @Input() iconOrZone: 'icon' | 'zone' = 'zone';
  @Input() border = true;

  @Output() fileUploaded: EventEmitter<File[]> = new EventEmitter();
  @Output() attachmentCanceled: EventEmitter<string> = new EventEmitter();

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef<
    HTMLInputElement
  >;

  onChange: () => any;

  public files: File[] = [];

  private destroy$: Subject<void> = new Subject();

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.reset
      .pipe(
        tap(() => this.cancelAttachment()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  @HostListener('window.beforeunload')
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  @HostListener('change', ['$event.target.files'])
  @HostListener('drop', ['$event.target.files'])
  emitFiles(event: FileList) {
    let files: File[] = [];
    if (event && event.length > 0) {
      for (let i = 0; i < event.length; i++) {
        files = [...files, event.item(i)];
      }
    }
    this.files = files;
    this.fileUploaded.emit(this.files);
  }

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  preventDragDropDefault(event) {
    event.preventDefault();
  }

  writeValue(value: null) {
    this.host.nativeElement.nodeValue = '';
    this.files = null;
  }

  registerOnChange(fn: () => any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any) {}

  cancelAttachment(name?): void {
    this.files = null;
    if (name) {
      this.attachmentCanceled.emit(name);
    }
    this.fileInput.nativeElement.value = '';
  }
}
