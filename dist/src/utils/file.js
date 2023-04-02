"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadStaticFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const api_1 = require("../request/api");
const path_1 = require("path");
/**
 *
 * @param readStream - 可读流
 * @param writeStream - 写入流
 * @returns Promise
 */
function pipeHandler(readStream, writeStream) {
    return new Promise((r, j) => {
        try {
            readStream.pipe(writeStream);
            writeStream.on('finish', () => {
                r(true);
            });
            writeStream.on('error', (e) => {
                j(e);
            });
        }
        catch (e) {
            j(e);
        }
    });
}
/**
 *
 * @param url - 下载地址
 * @param targetPath - 目标文件夹
 * @returns Promise
 */
async function downloadStaticFile(url, dirpath) {
    try {
        const targetPath = (0, path_1.join)(dirpath, (0, path_1.basename)(url));
        const writeStream = fs_extra_1.default.createWriteStream(targetPath);
        const response = await (0, api_1.requestStream)(url);
        const readStream = response.data;
        return await pipeHandler(readStream, writeStream);
    }
    catch (err) {
        throw err;
    }
}
exports.downloadStaticFile = downloadStaticFile;
