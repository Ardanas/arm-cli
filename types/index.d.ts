import { Command } from 'cac';

export interface ICustomObj<T = any> {
  [key: string]: T;
}

export type AsyncMiddleware = (...args: any[]) => Promise<void> | void;

export type TUseParams = AsyncMiddleware | AsyncMiddleware[];
export declare class NewCommand extends Command {
  use: (callback?: TUseParams) => this;
}
