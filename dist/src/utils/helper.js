"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUrl = exports.isValidUrl = void 0;
const url_1 = __importDefault(require("url"));
/**
 *
 * @param url - 下载地址
 * @returns boolean
 */
function isValidUrl(herf) {
    const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[^\s]*)?$/i;
    return pattern.test(herf);
}
exports.isValidUrl = isValidUrl;
function formatUrl(herf) {
    const { protocol } = url_1.default.parse(herf);
    if (!protocol)
        herf = `http://${herf}`;
    return herf;
}
exports.formatUrl = formatUrl;
