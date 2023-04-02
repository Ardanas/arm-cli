import CAC from '../src/utils/MyCac';
import { getPublishTypeByPrompt, publishAction, downloadAction } from '../src';
// console.log('CAC', CAC);

const cac = (name = '') => new CAC(name);

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
    options.type = options.type || (await getPublishTypeByPrompt());
  })
  .action(async (dirpath, options) => {
    console.log('dirpath', dirpath);
    console.log('options', options);
    await publishAction(dirpath, options.type);
  });

cli
  .command('download <url>', 'download file')
  .option('url [url]', '下载地址')
  .option('--path [path]', '目录', { default: '.' })
  .action(async (url, options) => {
    if (!url) throw '缺少url';
    console.log('url, options', options);
    await downloadAction(options.path, url);
  });

try {
  cli.parse();
} catch (error) {
  console.error(`${error}`);
  process.exit(1);
}
