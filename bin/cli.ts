import CAC from '../src/MyCac';
import inquirer from 'inquirer';

// console.log('CAC', CAC);

const cac = (name = '') => new CAC(name);

const cli = cac('arm-cli');

cli.help();
cli.version('1.0.1');

const fn1 = async (options: any, next: any) => {
  const { type, path } = options;
  // 如果没有输入type，则在终端提供选项给用户选择
  if (!type) {
    const answers = await inquirer.prompt([
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
