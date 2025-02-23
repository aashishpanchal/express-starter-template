import conf from './conf';
import ansis from 'ansis';
import {createApp} from './app';

const main = async () => {
  // create api server
  const api = await createApp();
  // host or port from config
  const {PORT, HOST} = conf;
  // Start the server
  api.listen(PORT, HOST, () => {
    console.log(ansis.cyanBright(`http://${HOST}:${PORT}`));
    console.log(`Press CTRL + C to exit.`);
  });
};

void main();
