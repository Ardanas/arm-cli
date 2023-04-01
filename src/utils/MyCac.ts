import { CAC, Command } from 'cac';
import chalk from 'chalk';

import { NewCommand, AsyncMiddleware, AsyncMiddlewareOrArray } from '../../types';

interface CommandConfig {
  allowUnknownOptions?: boolean;
  ignoreOptionDefaultValue?: boolean;
}

export default class MyCac extends CAC {
  constructor(name?: string) {
    super(name);
  }

  command(rawName: string, description: string = '', config: CommandConfig = {}): NewCommand {
    const command = new MyCommand(rawName, description, config, this);
    command.globalCommand = this.globalCommand;
    this.commands.push(command);
    return command;
  }
}

class MyCommand extends Command {
  middleware: AsyncMiddleware[];

  constructor(rawName: string, description: string, config: CommandConfig, cli: CAC) {
    super(rawName, description, config, cli);
    this.middleware = [];
  }

  use(callback?: AsyncMiddlewareOrArray) {
    if (!callback || !this.rawName) return this;
    if (Array.isArray(callback)) {
      this.middleware = callback;
    } else {
      this.middleware.push(callback);
    }
    return this;
  }

  compose(middleware: Function[]) {
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
    for (const fn of middleware) {
      if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
    }
    let index = -1;

    return function (ctx: any, next?: Function) {
      function dispatch(i: number) {
        if (i <= index) return Promise.reject(new Error('next() called multiple times'));
        index = i;
        let fn: Function | undefined = middleware[i];
        if (i === middleware.length) fn = next;
        if (!fn) return Promise.resolve();
        try {
          return Promise.resolve(
            fn(ctx, function next() {
              dispatch(i + 1); // 执行下一个中间件
            })
          );
        } catch (err) {
          throw err;
          // return Promise.reject(err);
        }
      }
      return dispatch(0);
    };
  }

  action(callback: AsyncMiddleware): this {
    const _callback = async (...args: any[]) => {
      // console.log('args', args);
      // console.log('this.args', this.args);
      for (let i = 0; i < this.middleware.length; i++) {
        await this.middleware[i].apply(this, args);
      }

      callback.apply(this, args);

      // const fn = this.compose([...this.middleware, callback]);
      // fn.call(this.cli, args[0]).catch((err) => {
      //   if (typeof err === 'string') {
      //     console.log(chalk.red('[错误]: ' + err));
      //   } else {
      //     console.error(err);
      //   }
      //   process.exit(-1);
      // });
    };

    super.action(_callback);
    return this;
  }
}
