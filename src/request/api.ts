import request from './axios';

export function requestStream(url: string) {
  return request.get(url, {
    responseType: 'stream', //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置
  });
}
