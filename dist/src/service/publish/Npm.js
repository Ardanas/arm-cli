"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const file_1 = require("../../utils/file");
class Npm {
    constructor(dirpath) {
        this.dirpath = (0, path_1.resolve)(dirpath);
    }
    async download(url) {
        await (0, file_1.downloadStaticFile)(url, this.dirpath);
    }
}
exports.default = Npm;
