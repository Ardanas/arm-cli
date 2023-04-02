"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestStream = void 0;
const axios_1 = __importDefault(require("./axios"));
async function requestStream(url) {
    const response = await axios_1.default.head(url);
    if (response.status === 200 || (response.status === 204 && response.headers['content-length'] > 0)) {
        return axios_1.default.get(url, {
            responseType: 'stream',
        });
    }
    else {
        throw '确保资源是否存在';
    }
}
exports.requestStream = requestStream;
