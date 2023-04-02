import { describe, it, expect } from 'vitest';
import fs from 'fs-extra';
import { basename, join } from 'path';
import { downloadStaticFile } from '../src/utils/file';

describe('file', () => {
  it('download by url test', async () => {
    const url =
      'https://i1.hdslb.com/bfs/archive/a4f2940e2c70d23e9cb91018ae6f8bbb47bd58db.png@672w_378h_1c_!web-search-common-cover.webp';
    const path = '/Users/ardans/Documents/Mystudy/MyProject/arm-cli/download';
    const targetPath = await downloadStaticFile(url, path);
    const isExist = fs.existsSync(targetPath);
    // console.log('isExist', isExist);
    expect(isExist).toEqual(true);
  });
});
