const fs = require('fs');
const path = require('path');

const localesPath = 'public/localazy';

const run = () => {
  if (fs.existsSync(path.resolve(localesPath))) {
    const result = fs
      .readdirSync(localesPath)
      .map((langFolder) =>
        fs.readdirSync(`${localesPath}/${langFolder}`).map((filename) => `${localesPath}/${langFolder}/${filename}`),
      )
      .flat()
      .reduce((prev, filePath) => {
        try {
          const { 2: langKey, 3: filename } = filePath.split('/');
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filePath)));
          const namespace = filename.replace('.json', '');
          const text = Object.entries(data).reduce((dataPrev, arr) => {
            const [key, value] = arr;
            return {
              ...dataPrev,
              [namespace]: {
                ...dataPrev[namespace],
                [key]: value,
              },
            };
          }, {});

          return {
            ...prev,
            [langKey]: {
              ...prev[langKey],
              ...text,
            },
          };
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('Error loading language file', e);
          return prev;
        }
      }, {});

    try {
      fs.writeFileSync('public/static/localazy.json', JSON.stringify(result));
      fs.rmdirSync('public/localazy', { recursive: true });
    } catch (err) {
      console.error(err);
    }
  }
};

run();

module.exports = run;
