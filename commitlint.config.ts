import { readdirSync } from 'node:fs';
import {
  RuleConfigSeverity as Level,
  type UserConfig,
} from '@commitlint/types';

const packageDirectoryList: string[] = [];

try {
  for (const item of readdirSync('./packages', { withFileTypes: true })) {
    if (item.isDirectory()) {
      packageDirectoryList.push(item.name);
    }
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn({ warning: error });
}

const scopeSeparator = /[,/]/gu;

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => commit.startsWith('Pull request #')],
  rules: {
    'scope-empty': [Level.Error, 'never'],
    'scope-separates-with-comma-and-space': [Level.Error, 'always'],
    'scope-enum': [Level.Error, 'always', ['root', ...packageDirectoryList]],
  },
  plugins: [
    {
      rules: {
        'scope-separates-with-comma-and-space': async ({ scope }) => {
          if (scope) {
            const separateCounter = [...scope.matchAll(scopeSeparator)];

            if (separateCounter.length > 0) {
              for (const [index, part] of scope
                .split(scopeSeparator)
                .entries()) {
                const isValid =
                  index === 0 ? !part.startsWith(' ') : part.startsWith(' ');

                if (isValid === false) {
                  return [
                    isValid,
                    `Use comma and space ", " before scope "${part}"`,
                  ];
                }
              }
            }
          }

          return [true];
        },
      },
    },
  ],
};

export default Configuration;
