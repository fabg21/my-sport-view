import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  HostListener
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as fromStore from '../../store';
import { FileType } from '../../models';
import { map, filter, concatMap, concatAll } from 'rxjs/operators';
import { FileUploadService } from '../../services';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit, OnDestroy {
  @Input() requieredFileTypes: FileType[];
  @Input() ownerId: string; // use observable and make it reactive.
  @Input() maxTotalFilesSize$: Observable<number>;

  private resetInput: Subject<void> = new Subject();
  public resetInput$ = this.resetInput.asObservable();

  public completed$: Observable<boolean>;
  public progress$: Observable<number>;
  public error$: Observable<string>;

  public isInProgress$: Observable<boolean>;
  public isReady$: Observable<boolean>;
  public hasFailed$: Observable<boolean>;

  public uploadForm: FormGroup;

  private destroy$ = new Subject<void>();

  public files$ = this.store$.pipe(
    select(fromStore.selectFiles),
    map(Object.keys),
    filter(arr => arr.length > 0),
    concatAll(),
    concatMap(fileName => this.service.getFileUrl(fileName, 'avatars'))
  );

  constructor(
    private store$: Store<fromStore.UploadState>,
    private service: FileUploadService
  ) {}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      file: new FormControl(null, [
        Validators.required,
        requiredTypes(this.requieredFileTypes)
      ])
    });
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.destroy$.next();
  }

  uploadFile(event: File[]) {
    this.store$.dispatch(
      new fromStore.UploadRequest({
        file: event[0],
        ownerId: this.ownerId
      }) // TODO : handle proper multi in remote.
    );
  }

  cancelAttachment(event: string) {}
}

function requiredTypes(fileTypes: Array<FileType>) {
  return (control: FormControl) => {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if (!fileTypes.map(x => x.toLowerCase().includes(extension))) {
        return {
          requiredFileType: true
        };
      }
      return null;
    }
    return null;
  };
}
