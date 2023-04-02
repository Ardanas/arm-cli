"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const mime_types_1 = __importDefault(require("mime-types"));
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
    const contentType = response.headers['Content-Type'];
    const ext = mime_types_1.default.extension(contentType);
    if (ext === 'json') {
        const data = response.data;
        if (!data.status)
            return Promise.reject(data.msg);
        return data;
    }
    return response;
}, (error) => {
    // console.dir(error);
    const response = error.response;
    if (response) {
        const { status, statusText } = response;
        return Promise.reject(`[${status}]: ${statusText}`);
    }
    else if (error.code === 'ECONNABORTED' ||
        error.message === 'Network Error' ||
        error.message.includes('timeout')) {
        return Promise.reject(error.message || '请求超时');
    }
    return Promise.reject(`[${error.code}]: ${error.message}`);
});
exports.default = instance;
