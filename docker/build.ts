import { exec } from 'child_process';
import { remove, ensureDir, move } from 'fs-extra';
import { promisify } from 'util';
import { join } from 'path';

const TMP = `${__dirname}/tmp`;
const FRONT = join(__dirname, '..', 'frontend');
const BACK = join(__dirname, '..', 'backend');
const VERSION = require('./package.json').version;
const TAG = 'registry.heroku.com/bgpg/web';

const execAsPromise = promisify(exec);

async function pack(path: string): Promise<void> {
  const result = await execAsPromise('npm pack --silent', { cwd: path });
  const tgz = result.stdout
    .split('\n')
    .filter((l) => !!l)
    .pop();
  return move(join(path, tgz), join(TMP, tgz));
}

async function build() {
  console.log('Building...');
  await remove(TMP);
  await ensureDir(TMP);
  console.log('Copying backend...');
  await pack(BACK);
  console.log('Copying frontend...');
  await pack(FRONT);
  console.log('Building docker image...');
  await execAsPromise(`docker build . --tag=${TAG}:${VERSION}`);
  await execAsPromise(`docker build . --tag=${TAG}`);
  console.log('Cleaning...');
  await remove(TMP);
}

build()
  .then(() => console.log('DONE'))
  .catch((error: any) => {
    console.error('ERROR');
    console.error(error);
    process.exit(1);
  });
