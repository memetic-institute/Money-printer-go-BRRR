module.exports = {
  '!(.next|.vercel|out|coverage|node_modules)/**/!(*test).(ts|tsx)': [
    () => 'tsc --noEmit --skipLibCheck',
    'prettier --write',
    'eslint --fix',
  ],
  '!(.next|.vercel|out|coverage|node_modules)/**/!(*test).(js|jsx)': [
    'prettier --write',
    'eslint --fix',
  ],
  '*.{json,md}': ['prettier --write'],
};
