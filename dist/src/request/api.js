"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestStream = void 0;
const axios_1 = __importDefault(require("./axios"));
function requestStream(url) {
    return axios_1.default.get(url, {
        responseType: 'stream', //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置
    });
}
exports.requestStream = requestStream;
