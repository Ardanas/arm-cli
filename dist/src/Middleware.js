"use strict";
class Middleware {
    constructor() {
        this.middleware = [];
    }
    use(fn) {
        if (typeof fn !== 'function')
            throw new TypeError('middleware must be a function!');
        this.middleware.push(fn);
    }
    run(middleware = this.middleware) {
        let index = -1;
        return function (ctx, next) {
            const dispatch = (i) => {
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
                        return dispatch(i + 1);
                    }));
                }
                catch (err) {
                    return Promise.reject(err);
                }
            };
            return dispatch(0);
        };
    }
}
