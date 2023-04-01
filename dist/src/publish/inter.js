"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class ResourcePublish {
    constructor(dirpath) {
        this.dirpath = dirpath;
    }
    async validate() {
        const isExist = fs_1.default.existsSync(this.dirpath);
    }
    async before() { }
    async after() { }
    async main() { }
    async publish() {
        await this.before();
        await this.main();
        await this.after();
    }
}
exports.default = ResourcePublish;
