"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDonwloadUrl = exports.getPkgScopeAndName = void 0;
/**
 * @param pkgName - 包名
 * @returns
 */
function getPkgScopeAndName(pkgName) {
    const splitArr = pkgName.split('/');
    if (splitArr.length === 1) {
        return { name: pkgName };
    }
    return { scope: splitArr[0], name: splitArr[1] };
}
exports.getPkgScopeAndName = getPkgScopeAndName;
/**
 * 获取指定包名和版本的下载链接
 * @param pkgName - 包名
 * @param version - 版本号
 * @returns 下载链接
 */
function getDonwloadUrl(pkgName, version) {
    const { name } = getPkgScopeAndName(pkgName);
    const _URL = `/repository/npm-group/${pkgName}/-/${name}-${version}.tgz`;
    return _URL;
}
exports.getDonwloadUrl = getDonwloadUrl;
