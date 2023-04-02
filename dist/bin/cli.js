"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const MyCac_1 = __importDefault(require("../src/utils/MyCac"));
const src_1 = require("../src");
// console.log('CAC', CAC);
const cac = (name = '') => new MyCac_1.default(name);
const cli = cac('arm-cli');
cli.help();
cli.version('1.0.1');
// 全局options
// cli
//   .option('--config <file>, -c <file>', `[string]  use specified config file`)
cli
    .command('publish [dirpath]', 'publish template')
    .option('--type [type]', '发布的资源类型')
    .example('--type npm')
    .use(async (_, options) => {
    options.type = options.type || (await (0, src_1.getPublishTypeByPrompt)());
})
    .action(async (dirpath, options) => {
    console.log('dirpath', dirpath);
    console.log('options', options);
    await (0, src_1.publishAction)(dirpath, options.type);
});
cli
    .command('download <url>', 'download file')
    .option('url [url]', '下载地址')
    .option('--path [path]', '目录', { default: '.' })
    .use(src_1.downloadBefore)
    .action(async (url, options) => {
    if (!url)
        throw '缺少url';
    await (0, src_1.downloadAction)(options.path, url);
});
try {
    cli.parse();
}
catch (error) {
    console.error(`${error}`);
    process.exit(1);
}
process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk_1.default.red(reason));
});
