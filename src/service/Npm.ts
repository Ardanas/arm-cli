import { resolve } from 'path';

export default class Npm {
  dirpath: string;
  constructor(_dirpath?: string) {
    this.dirpath = resolve(_dirpath || '.');
  }
}
