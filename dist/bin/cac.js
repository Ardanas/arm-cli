"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("cac");
// console.log('CAC', CAC);
const cac = (name = '') => new cac_1.CAC(name);
const cli = cac('arm-cli');
cli.help();
cli.version('1.0.1');
cli
    .command('publish [dirpath]', 'publish template')
    .option('--type [type]', '选择发布的资源类型')
    .example('--type npm')
    .action(async (options) => {
    console.log('options', options);
});
// cli.command('login').action(async () => {
//   const { username, password } = await inquirer.prompt([
//     { type: 'input', name: 'username', message: 'Username:' },
//     { type: 'password', name: 'password', message: 'Password:' },
//   ]);
//   console.log(`Logging in with username ${username} and password ${password}...`);
//   // send login request here
// });
cli.parse();
// const parsed = cli.parse()
// console.log(JSON.stringify(parsed, null, 2))
