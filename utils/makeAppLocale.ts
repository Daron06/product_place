export const makeAppLocale = (): Record<string, Record<string, string>> | null => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const path = require('path');
    const localesPath = 'public/localazy';

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
            }, {}) as Record<string, string>;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // allKeys = new Set(...[...allKeys, ...Object.keys(text)]);

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
        }, {} as Record<string, string>);

      //       const typeD = `
      // export declare global {
      // type TranslateKeys = '${allKeys.join("' | '")}' | string;
      // }
      // `;

      // fs.writeFileSync(path.resolve(process.cwd(), '@types/translate.d.ts'), typeD);

      return result;
    }
  }

  return null;
};
