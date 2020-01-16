import { getType } from 'mime';

/**
 * uses the mime-types library to return the correspondig mime type.
 * using mime-wrapper mini lib to make it compatible with angular CLI
 * returns false if type is unknown / invalid.
 * https://github.com/jshttp/mime-types
 * https://github.com/marlon360/mime-wrapper
 */
export function getMimeType(string: string): string {
  const mimeType = getType(string);
  if (!mimeType) {
    throw new Error(`${string} is not a valid MIME type`);
  }
  return mimeType;
}
