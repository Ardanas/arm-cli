"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class Npm {
    constructor(_dirpath) {
        this.dirpath = (0, path_1.resolve)(_dirpath || '.');
    }
}
exports.default = Npm;
