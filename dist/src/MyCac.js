"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("cac");
const chalk_1 = __importDefault(require("chalk"));
class MyCac extends cac_1.CAC {
    constructor(name) {
        super(name);
    }
    command(rawName, description = '', config = {}) {
        const command = new MyCommand(rawName, description, config, this);
        command.globalCommand = this.globalCommand;
        this.commands.push(command);
        return command;
    }
}
exports.default = MyCac;
class MyCommand extends cac_1.Command {
    constructor(rawName, description, config, cli) {
        super(rawName, description, config, cli);
        this.middleware = [];
    }
    use(callback) {
        if (!callback || !this.rawName)
            return this;
        if (Array.isArray(callback)) {
            this.middleware = callback;
        }
        else {
            this.middleware.push(callback);
        }
        return this;
    }
    compose(middleware) {
        if (!Array.isArray(middleware))
            throw new TypeError('Middleware stack must be an array!');
        for (const fn of middleware) {
            if (typeof fn !== 'function')
                throw new TypeError('Middleware must be composed of functions!');
        }
        let index = -1;
        return function (ctx, next) {
            function dispatch(i) {
                if (i <= index)
                    return Promise.reject(new Error('next() called multiple times'));
                index = i;
                let fn = middleware[i];
                if (i === middleware.length)
                    fn = next;
                if (!fn)
                    return Promise.resolve();
                try {
                    return Promise.resolve(fn(ctx, function next() {
                        dispatch(i + 1); // 执行下一个中间件
                    }));
                }
                catch (err) {
                    throw err;
                    // return Promise.reject(err);
                }
            }
            return dispatch(0);
        };
    }
    action(callback) {
        const _callback = async (...args) => {
            // console.log('args', args);
            // // console.log('this.args', this.args);
            // for (let i = 0; i < this.middleware.length; i++) {
            //   await this.middleware[i].apply(this, args);
            // }
            // callback.apply(this, args);
            const fn = this.compose([...this.middleware, callback]);
            fn.call(this.cli, args[0]).catch((err) => {
                if (typeof err === 'string') {
                    console.log(chalk_1.default.red('[错误]: ' + err));
                }
                else {
                    console.error(err);
                }
                process.exit(-1);
            });
        };
        super.action(_callback);
        return this;
    }
}
