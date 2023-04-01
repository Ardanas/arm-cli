"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MyCac_1 = __importDefault(require("../src/MyCac"));
const inquirer_1 = __importDefault(require("inquirer"));
// console.log('CAC', CAC);
const cac = (name = '') => new MyCac_1.default(name);
const cli = cac('arm-cli');
cli.help();
cli.version('1.0.1');
const fn1 = async (options, next) => {
    const { type, path } = options;
    // 如果没有输入type，则在终端提供选项给用户选择
    if (!type) {
        const answers = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'type',
                message: '请选择发布的类型：',
                choices: [
                    { name: '组件', value: 'component' },
                    { name: '骨架', value: 'skeleton' },
                ],
            },
        ]);
        options.type = answers.type;
    }
    next();
};
cli
    .command('publish <dirpath>', 'publish template')
    .option('--type [type]', '选择发布的资源类型')
    .example('--type npm')
    .use([fn1])
    // .use((options, next) => {
    //   console.log('2', options);
    //   options.xx = 2;
    //    next()
    // })
    .action(async (options, next) => {
    // console.log('dirpath', options);
    console.log('options', options);
});
cli.parse();
