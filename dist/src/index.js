"use strict";
// install
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAction = exports.publishAction = exports.getPublishTypeByPrompt = void 0;
// publish
// download
// build
// login
// config
const inquirer_1 = __importDefault(require("inquirer"));
const CONSTANT = __importStar(require("./config/constant"));
const file_1 = require("./utils/file");
const getPublishTypeByPrompt = async () => {
    const answers = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'type',
            message: '请选择发布的资源类型：',
            choices: CONSTANT.RESOURCE_TYPE_CHOICES,
        },
    ]);
    return answers.type;
};
exports.getPublishTypeByPrompt = getPublishTypeByPrompt;
const publishAction = async (dirpath, type) => { };
exports.publishAction = publishAction;
const downloadAction = async (dirpath, url) => {
    await (0, file_1.downloadStaticFile)(url, dirpath);
};
exports.downloadAction = downloadAction;
