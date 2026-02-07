/**
 * @type {import('prettier').Config}
 */
module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: ['*.md', '*.mdc'],
      options: {
        proseWrap: 'always',
      },
    },
  ],
};
