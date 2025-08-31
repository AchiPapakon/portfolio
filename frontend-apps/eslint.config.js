import { FlatCompat } from '@eslint/eslintrc';
import * as url from 'url';

import js from '@eslint/js';
import globals from 'globals';

import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import fs from 'fs';
import path from 'path';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const compat = new FlatCompat({
    baseDirectory: dirname,
    resolvePluginsRelativeTo: dirname,
});

const prettierConfig = JSON.parse(fs.readFileSync(path.resolve(dirname, '.prettierrc'), 'utf-8'));

export default tseslint.config(
    {
        // It has to be separate https://github.com/eslint/eslint/discussions/18304#discussioncomment-9069706
        ignores: ['**/dist', '**/build', '**/coverage', '**/temp', '**/public', '**/test'],
    },
    {
        files: ['**/*.{js,ts,tsx}'],
    },
    js.configs.recommended,
    ...compat.extends('airbnb'),
    ...compat.extends('plugin:react/recommended'),
    ...compat.extends('plugin:import/recommended'),
    ...compat.extends('plugin:jsx-a11y/recommended'),
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        languageOptions: {
            ecmaVersion: 'latest', // default: 2020
            globals: globals.browser,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'arrow-parens': [2, 'as-needed'],
            'default-param-last': 1,
            'import/extensions': 0,
            'import/no-extraneous-dependencies': 0,
            'import/no-unresolved': 0,
            'import/prefer-default-export': 0,
            'react/jsx-indent': [2, 4],
            'react/jsx-indent-props': [2, 4],
            'jsx-a11y/click-events-have-key-events': 0,
            'jsx-a11y/no-static-element-interactions': 0,
            'no-console': [1, { allow: ['error'] }],
            'prettier/prettier': ['error', prettierConfig],
            'react/jsx-closing-bracket-location': 2,
            'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
            'react/react-in-jsx-scope': 0,
            'react/jsx-props-no-spreading': 1,
            'react/require-default-props': 0,
            'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
        },
    },
    pluginPrettierRecommended
);
