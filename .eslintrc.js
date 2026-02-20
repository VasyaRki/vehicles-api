module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'eslint-plugin-import', 'unused-imports', 'unicorn'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    settings: {
        'import/internal-regex': '^@(libs|app)',
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'prettier/prettier': ['error'],
        'no-console': ['error', { allow: ['debug', 'warn', 'error'] }],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unsafe-declaration-merging': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
        'unused-imports/no-unused-imports': 'error',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    Object: {
                        message: 'Avoid using the `Object` type. Did you mean `object`?',
                    },
                    Boolean: {
                        message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
                    },
                    Number: {
                        message: 'Avoid using the `Number` type. Did you mean `number`?',
                    },
                    String: {
                        message: 'Avoid using the `String` type. Did you mean `string`?',
                    },
                    Symbol: {
                        message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
                    },
                },
            },
        ],
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'id-blacklist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined',
        ],
        'unicorn/better-regex': 'error',
        'unicorn/no-new-buffer': 'error',
        'unicorn/no-unused-properties': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/prefer-array-flat': 'error',
        'unicorn/prefer-array-index-of': 'error',
        'max-len': ['error', { code: 120, ignoreComments: true }],
        'no-process-env': 'error',
        'no-duplicate-imports': 'error',
        'import/no-internal-modules': ['error', { forbid: ['@api-main/**'] }],
    },
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
                '@typescript-eslint/no-var-requires': 'error',
            },
        },
    ],
};
