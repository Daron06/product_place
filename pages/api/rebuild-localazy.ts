import { exec } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (_: NextApiRequest, res: NextApiResponse): void => {
  // eslint-disable-next-line consistent-return
  exec('npx @localazy/cli download', (error, out): void => {
    // eslint-disable-next-line no-console
    console.log(error, out);
    if (!error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
      const makeLocalazy = require('../../build-localazy');
      makeLocalazy();
      return res.status(200).json({ status: 'ok' });
    }
    res.status(500).json({ status: 'error', message: error });
  });
};

export default handler;
