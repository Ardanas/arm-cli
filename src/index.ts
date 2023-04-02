// install

// publish

// download

// build

// login

// config
import inquirer from 'inquirer';

import * as publishCli from './service/publish';
import * as types from '../types';
import * as CONSTANT from './config/constant';
import NpmService from '../src/service/Npm';
import { downloadStaticFile } from './utils/file';
import { isValidUrl, formatUrl } from './utils/helper';

export const getPublishTypeByPrompt = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '请选择发布的资源类型：',
      choices: CONSTANT.RESOURCE_TYPE_CHOICES,
    },
  ]);
  return answers.type;
};

export const downloadBefore = (url: string) => {
  const isValid = isValidUrl(url);
  if (!isValid) throw '错误URL地址';
};

export const publishAction = async (dirpath: string, type: string) => {};

export const downloadAction = async (dirpath: string, url: string) => {
  await downloadStaticFile(url, dirpath);
};
