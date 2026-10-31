import { globalIgnores, defineConfig } from 'eslint/config';
import obsidianmd from 'eslint-plugin-obsidianmd';
import { PlainTextParser } from 'eslint-plugin-obsidianmd/dist/lib/plainTextParser.js';
import tseslint from 'typescript-eslint';

const moduleUrl = new URL('.', import.meta.url);
const tsconfigRootDir =
	moduleUrl.hostname === ''
		? decodeURIComponent(moduleUrl.pathname.replace(/^\/(?=[A-Z]:\/)/i, ''))
		: `//${moduleUrl.hostname}${decodeURIComponent(moduleUrl.pathname)}`;
export default defineConfig([
	globalIgnores([
		'node_modules',
		'dist',
		'apm_modules',
		'esbuild.config.mjs',
		'version-bump.mjs',
		'main.js',
		'package-lock.json',
	]),
	...obsidianmd.configs.recommended,
	{
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ['eslint.config.mts', 'manifest.json', 'scripts/setup-git-hooks.mjs'],
				},
				tsconfigRootDir,
			},
		},
	},
	{
		files: ['manifest.json'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				tsconfigRootDir,
				extraFileExtensions: ['.json'],
			},
		},
		rules: {
			'obsidianmd/validate-manifest': 'error',
		},
	},
	{
		files: ['LICENSE'],
		languageOptions: {
			parser: PlainTextParser,
		},
		rules: {
			'obsidianmd/validate-license': 'error',
		},
	},
]);
