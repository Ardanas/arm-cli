import fs from 'fs-extra';
import { basename, extname, join } from 'path';
import mime from 'mime-types';
import chalk from 'chalk';
import { requestStream } from '../request/api';

/**
 *
 * @param readStream - 可读流
 * @param writeStream - 写入流
 * @returns Promise
 */
function pipeHandler(readStream: fs.ReadStream, writeStream: fs.WriteStream) {
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
export async function downloadStaticFile(url: string, dirpath: string) {
  try {
    // 确保文件夹存在
    fs.ensureDirSync(dirpath);
    console.log(chalk.blue(`正在下载: ${url}`));
    const response = await requestStream(url);
    const contentType = response.headers['content-type'];
    const extension = mime.extension(contentType);
    const realExt = extension ? `.${extension}` : extname(url);
    // console.log('realExt', realExt);
    if (!realExt) throw '识别不到资源类型';
    const filename = Date.now() + realExt;
    const targetPath = join(dirpath, filename);
    const writeStream = fs.createWriteStream(targetPath);
    const readStream = response.data;
    await pipeHandler(readStream, writeStream);
    console.log(chalk.blue(`下载结束: ${targetPath}`));
    return targetPath;
  } catch (err) {
    console.error(chalk.red(`下载失败: ${err}`));
  }
  return '';
}
