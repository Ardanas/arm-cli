import request from './axios';

export async function requestStream(url: string) {
  const response = await request.head(url);
  if (response.status === 200 || (response.status === 204 && response.headers['content-length'] > 0)) {
    return request.get(url, {
      responseType: 'stream',
    });
  } else {
    throw '确保资源是否存在';
  }
}
