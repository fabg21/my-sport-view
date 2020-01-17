import { localActions } from '../actions';
import { initialState, reducer } from './local-upload.reducer';
import { generateFile } from '../../utils';
import { UploadStatus, LocalFile } from '../../models';
import { fromArrayToEntities } from '../../../messaging/store/utils';

describe('local upload reducer', () => {
  const INITIAL_STATE = initialState;
  const fileA = generateFile(['some', 'content'], 'fileA.txt');
  const fileB = generateFile(['some other content'], 'fileB.pdf');
  const fileC = generateFile(['<h1>some html content</h1>'], 'fileC.html');
  const files = [fileA, fileB, fileC];
  describe('UPLOAD_REQUEST', () => {
    let action;
    let actualState;

    beforeEach(() => {
      action = new localActions.LocalUploadRequest({ files });
    });

    it('should change status to Requested', () => {
      const expectedStatus = UploadStatus.Requested;
      actualState = reducer(INITIAL_STATE, action);
      expect(actualState.status).toEqual(expectedStatus);
    });

    it('should set progress to null', () => {
      const expectedProgress = null;
      actualState = reducer(INITIAL_STATE, action);
      expect(actualState.progress).toEqual(expectedProgress);
    });

    it('should error be null', () => {
      const expectedError = null;
      actualState = reducer(INITIAL_STATE, action);
      expect(actualState.error).toEqual(expectedError);
    });
  });

  describe('UPLOAD_CANCEL', () => {
    let fileEntities: { [id: string]: LocalFile };
    let filesWithIds;
    let action;
    let actualState;
    let stateWithFiles;

    beforeEach(() => {
      filesWithIds = [fileA, fileB, fileC].map(x => ({ ...x, id: x.name }));
      fileEntities = fromArrayToEntities(filesWithIds);
      stateWithFiles = {
        ...INITIAL_STATE,
        files: fileEntities
      };
      action = new localActions.LocalUploadCancel({ name: 'fileA.txt' });
    });

    it('should change status to Ready', () => {
      const expectedStatus = UploadStatus.Ready;
      actualState = reducer(stateWithFiles, action);
      expect(actualState.status).toEqual(expectedStatus);
    });

    it('should set progress to null', () => {
      const expectedProgress = null;
      actualState = reducer(stateWithFiles, action);
      expect(actualState.progress).toEqual(expectedProgress);
    });

    it('should error be null', () => {
      const expectedError = null;
      actualState = reducer(stateWithFiles, action);
      expect(actualState.error).toEqual(expectedError);
    });

    it('should file has been removed', () => {
      const expectedFiles = filesWithIds.filter(x => x.id !== 'fileA.txt');
      const expectedFileEntities = fromArrayToEntities(expectedFiles);
      actualState = reducer(stateWithFiles, action);
      expect(actualState.files).toEqual(expectedFileEntities);
    });
  });

  describe('UPLOAD_STARTED', () => {
    let action;

    beforeEach(() => {
      action = new localActions.LocalUploadStarted();
    });

    it('should status be Started', () => {
      const expectedStatus = UploadStatus.Started;
      const actualState = reducer(INITIAL_STATE, action);
      expect(actualState.status).toEqual(expectedStatus);
    });

    it('should set progress to 0', () => {
      const expectedProgress = 0;
      const actualState = reducer(INITIAL_STATE, action);
      expect(actualState.progress).toEqual(expectedProgress);
    });
  });
});
