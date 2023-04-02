/**
 * @param pkgName - 包名
 * @returns
 */
export function getPkgScopeAndName(pkgName: string) {
  const splitArr = pkgName.split('/');
  if (splitArr.length === 1) {
    return { name: pkgName };
  }
  return { scope: splitArr[0], name: splitArr[1] };
}

/**
 * 获取指定包名和版本的下载链接
 * @param pkgName - 包名
 * @param version - 版本号
 * @returns 下载链接
 */
export function getDonwloadUrl(pkgName: string, version: string) {
  const { name } = getPkgScopeAndName(pkgName);
  const _URL = `/repository/npm-group/${pkgName}/-/${name}-${version}.tgz`;
  return _URL;
}
