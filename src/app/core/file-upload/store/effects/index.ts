import { UploadFileEffect } from './upload-file.effect';
import { LocalUploadFileEffects } from './local-upload-file.effects';

export const effects: any[] = [UploadFileEffect, LocalUploadFileEffects];

export * from './upload-file.effect';
export * from './local-upload-file.effects';
