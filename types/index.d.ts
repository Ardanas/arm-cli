import { Command } from 'cac';

export interface ICustomObj<T = any> {
  [key: string]: T;
}

export type AsyncMiddleware = (...args: any[]) => Promise<any> | void;

export type AsyncMiddlewareOrArray = AsyncMiddleware | AsyncMiddleware[];
export declare class NewCommand extends Command {
  use: (callback?: AsyncMiddlewareOrArray) => this;
}
