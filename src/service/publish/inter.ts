import fs from 'fs';
export default class ResourcePublish {
  dirpath: string;
  constructor(dirpath: string) {
    this.dirpath = dirpath;
  }

  async validate() {
    const isExist = fs.existsSync(this.dirpath);
  }
  async before() {}
  async after() {}
  async main() {}
  async publish() {
    await this.before();
    await this.main();
    await this.after();
  }
}
