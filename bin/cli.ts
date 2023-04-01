import CAC from '../src/utils/MyCac';
import inquirer from 'inquirer';

// console.log('CAC', CAC);

const cac = (name = '') => new CAC(name);

const cli = cac('arm-cli');

cli.help();
cli.version('1.0.1');

const fn1 = (dirpath: string, options: any) => {
  console.log('1', options);
  options.xx = 2;
};
const fn2 = (dirpath: string, options: any) => {
  console.log('2', options);
  options.bb = 3;
};

cli
  .command('publish <dirpath>', 'publish template')
  .option('--type [type]', '选择发布的资源类型')
  .example('--type npm')
  .use([fn1, fn2])
  // .use(async (dirpath, options) => {
  //   const { type, path } = options;
  //   // 如果没有输入type，则在终端提供选项给用户选择
  //   if (!type) {
  //     const answers = await inquirer.prompt([
  //       {
  //         type: 'list',
  //         name: 'type',
  //         message: '请选择发布的类型：',
  //         choices: [
  //           { name: '组件', value: 'component' },
  //           { name: '骨架', value: 'skeleton' },
  //         ],
  //       },
  //     ]);
  //     ctx.type = answers.type;
  //   }
  // })
  // .use((dirpath, options) => {
  //   console.log('2', options);
  //   options.xx = 2;
  // })
  // .use((dirpath, options) => {
  //   console.log('3', options);
  //   options.bb = 2;
  // })
  .action(async (dirpath, options) => {
    console.log('dirpath', dirpath);
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
