const fs = require('node:fs/promises');
const dotenv = require('dotenv');

dotenv.config();

// TODO: check mode
const envFile = './src/environments/environment.ts';

fs.readFile(envFile, { encoding: 'utf8' })
  .then((env_script) => {
    let txt = env_script
      .replace(/^(\s*contractAddress\:)\s*.*$/m, `$1 '${process.env.CONTRACT_ADDRESS}',`)
      .replace(/^(\s*testOwnerAddress\:)\s*.*$/m, `$1 '${process.env.OWNER_ADDRESS}',`)
      .replace(/^(\s*testBuyerAddress\:)\s*.*$/m, `$1 '${process.env.TEST_BUYER_ADDRESS}',`);
    return fs.writeFile(envFile, txt);
  })
  .then(() => {
    console.log('Done!');
  })
  .catch((err) => {
    console.error(err);
  });
