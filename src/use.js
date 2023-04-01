#!/usr/bin/env node

const cac = require('cac');
const { exec } = require('child_process');
const inquirer = require('inquirer');

const cli = cac();

// 中间件数组
const middlewares = [];

// 注册中间件
function use(fn) {
  middlewares.push(fn);
}

// 定义命令
cli.command('publish', '发布组件或骨架')
  .option('--type [type]', '发布的类型：component、npm、afa6、application或service')
  .option('--path <path>', '组件或骨架的路径')
  .action(async (options, _command) => {
    const ctx = { options };
    let index = 0;

    // 执行中间件
    async function next() {
      if (index < middlewares.length) {
        const middleware = middlewares[index++];
        await middleware(ctx, next);
      }
    }

    await next();

  });

// 注册中间件
use(async (ctx, next) => {
  const { options } = ctx;

  // 如果没有输入type，则在终端提供选项给用户选择
  if (!options.type) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: '请选择发布的类型：',
        choices: [
          'component',
          'npm',
          'afa6',
          'application',
          'service',
        ],
      },
    ]);

    options.type = answers.type;
  }

  await next();
});

use(async (ctx, next) => {
  const { options } = ctx;

  // 校验path参数
  if (!options.path) {
    console.error('请指定组件或骨架的路径');
    return;
  }

  await next();
});

cli.help();

cli.parse();
