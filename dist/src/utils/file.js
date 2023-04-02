"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadStaticFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const mime_types_1 = __importDefault(require("mime-types"));
const chalk_1 = __importDefault(require("chalk"));
const api_1 = require("../request/api");
/**
 *
 * @param readStream - 可读流
 * @param writeStream - 写入流
 * @returns Promise
 */
function pipeHandler(readStream, writeStream) {
    return new Promise((r, j) => {
        readStream.pipe(writeStream);
        writeStream.on('finish', () => {
            r(true);
        });
        writeStream.on('error', (e) => {
            j(e);
        });
    });
}
/**
 *
 * @param url - 下载地址
 * @param dirpath - 目标文件夹
 * @returns Promise
 */
async function downloadStaticFile(url, dirpath) {
    try {
        // 确保文件夹存在
        fs_extra_1.default.ensureDirSync(dirpath);
        console.log(chalk_1.default.blue(`正在下载: ${url}`));
        const response = await (0, api_1.requestStream)(url);
        const contentType = response.headers['content-type'];
        const extension = mime_types_1.default.extension(contentType);
        const realExt = extension ? `.${extension}` : (0, path_1.extname)(url);
        // console.log('realExt', realExt);
        if (!realExt)
            throw '识别不到资源类型';
        const filename = Date.now() + realExt;
        const targetPath = (0, path_1.join)(dirpath, filename);
        const writeStream = fs_extra_1.default.createWriteStream(targetPath);
        const readStream = response.data;
        await pipeHandler(readStream, writeStream);
        console.log(chalk_1.default.blue(`下载结束: ${targetPath}`));
        return targetPath;
    }
    catch (err) {
        console.error(chalk_1.default.red(`下载失败: ${err}`));
    }
    return '';
}
exports.downloadStaticFile = downloadStaticFile;
