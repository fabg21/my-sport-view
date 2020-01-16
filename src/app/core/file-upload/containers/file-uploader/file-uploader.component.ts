import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  startWith,
  tap,
  takeUntil
} from 'rxjs/operators';

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

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit, OnDestroy {
  @Input() requieredFileTypes: FileType[];
  @Input() ownerId: string; // use observable and make it reactive.
  @Input() standalone = false;
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

  constructor(private store$: Store<fromStore.UploadState>) {}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      file: new FormControl(null, [
        Validators.required,
        requiredTypes(this.requieredFileTypes)
      ])
    });

    // if (this.maxTotalFilesSize$) {
    //   this.maxTotalFilesSize$
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe(size =>
    //       this.store$.dispatch(
    //         new fromStore.localActions.LocalUploadUpdateMaxTotalFilesSize(size)
    //       )
    //     );
    // }

    // this.store$
    //   .pipe(
    //     select(fromStore.getFilesSize),
    //     startWith(0),
    //     distinctUntilChanged((x, y) => x < y),
    //     tap(() => this.resetInput.next()),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe();
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.destroy$.next();
  }

  uploadFile(event: File[]) {
    if (this.standalone) {
      this.store$.dispatch(
        new fromStore.remoteActions.UploadRequest({
          file: event[0],
          ownerId: this.ownerId
        }) // TODO : handle proper multi in remote.
      );
    } else {
      this.store$.dispatch(
        new fromStore.localActions.LocalUploadRequest({ files: event })
      );
    }
  }

  cancelAttachment(event: string) {
    if (!this.standalone) {
      this.store$.dispatch(
        new fromStore.localActions.LocalUploadCancel({ name: event })
      );
    }
  }
}

function requiredTypes(fileTypes: Array<FileType>) {
  return function(control: FormControl) {
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
