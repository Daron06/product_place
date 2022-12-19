import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  const localesPath = path.resolve('public/localazy');

  if (fs.existsSync(path.resolve(localesPath))) {
    const data = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), `${localesPath}/static/localazy.json`)).toString(),
    );
    res.status(200).json(data);
  }

  res.status(403).json({});
};

export default handler;
