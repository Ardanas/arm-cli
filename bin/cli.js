import { CAC } from 'cac';

// console.log('CAC', CAC);

const cac = (name = '') => new CAC(name);

const cli = cac('arm-cli');

cli.help();
cli.version('1.0.1');
// cli.parse();

// const parsed = cli.parse()

// console.log(JSON.stringify(parsed, null, 2))
