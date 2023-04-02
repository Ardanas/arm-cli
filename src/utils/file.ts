import fs from 'fs-extra';
import { requestStream } from '../request/api';
import { basename, join } from 'path';

/**
 *
 * @param readStream - 可读流
 * @param writeStream - 写入流
 * @returns Promise
 */
function pipeHandler(readStream: fs.ReadStream, writeStream: fs.WriteStream) {
  return new Promise((r, j) => {
    try {
      readStream.pipe(writeStream);
      writeStream.on('finish', () => {
        r(true);
      });
      writeStream.on('error', (e) => {
        j(e);
      });
    } catch (e) {
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
export async function downloadStaticFile(url: string, dirpath: string) {
  try {
    const targetPath = join(dirpath, basename(url));
    const writeStream = fs.createWriteStream(targetPath);
    const response = await requestStream(url);
    const readStream = response.data;
    return await pipeHandler(readStream, writeStream);
  } catch (err) {
    throw err;
  }
}
