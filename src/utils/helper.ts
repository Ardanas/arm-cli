import url from 'url';

/**
 *
 * @param url - 下载地址
 * @returns boolean
 */
export function isValidUrl(herf: string) {
  const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[^\s]*)?$/i;
  return pattern.test(herf);
}

export function formatUrl(herf: string) {
  const { protocol } = url.parse(herf);
  if (!protocol) herf = `http://${herf}`;
  return herf;
}
