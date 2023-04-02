"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: '/arm',
    timeout: 60000,
});
instance.interceptors.request.use((config) => {
    const token = '';
    if (token) {
        config.headers.Authorization = 'Bearer';
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});
instance.interceptors.response.use((response) => {
    const res = response.data;
    if (!(res === null || res === void 0 ? void 0 : res.status)) {
        return Promise.reject(res.msg);
    }
    return res;
}, (error) => {
    var _a, _b;
    console.dir(error);
    if (axios_1.default.isCancel(error)) {
        return Promise.reject(error);
    }
    const response = error.response;
    const configUrl = (_a = response === null || response === void 0 ? void 0 : response.config) === null || _a === void 0 ? void 0 : _a.url;
    if (response && !configUrl.match('/user/login')) {
        const { status, statusText } = response;
        switch (status) {
            case 404:
                console.error('请求接口404');
                break;
            default:
                console.error(statusText || '出错了');
                break;
        }
    }
    else if (error.code === 'ECONNABORTED' ||
        error.message === 'Network Error' ||
        error.message.includes('timeout')) {
        console.error('请求超时');
        return Promise.reject(error.message);
    }
    return Promise.reject((_b = error.response.data) === null || _b === void 0 ? void 0 : _b.msg);
});
exports.default = instance;
