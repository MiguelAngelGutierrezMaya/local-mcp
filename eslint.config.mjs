import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Configuración base de JavaScript
  js.configs.recommended,

  // Configuraciones de TypeScript
  ...tseslint.configs.recommended,

  // Configuración de Prettier
  prettier,

  // Directorio a ignorar
  {
    ignores: ['dist/**', '**/node_modules/**'],
  },

  // Plugins y reglas personalizadas
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    files: ['**/*.ts'],
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'prefer-const': 'error',
    },
  },
];
