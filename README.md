# ts-cli-starter

TypeScript CLI project template.

## Table of Contents

1. [Create an empty project](#1-create-an-empty-project)
1. [Add itself to `PATH`](#2-add-itself-to-path)
1. [Configure TypeScript in tsconfig.json](#3-configure-typescript-in-tsconfigjson)
1. [.editorconfig](#4-editorconfig)
1. [ESLint](#5-eslint)
1. [Prettier](#6-prettier)
1. [Must-have libraries](#7-must-have-libraries)

## 1. Create an empty project

Create an empty npm project,

```bash
npm init
```

Fill in some information then we get a `package.json` file:

```json
{
  "name": "ts-cli-starter",
  "version": "1.0.0",
  "description": "TypeScript CLI project template.",
  "main": "dist/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/soulmachine/ts-cli-starter.git"
  },
  "keywords": ["typescript", "CLI"],
  "author": "soulmachine",
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/soulmachine/ts-cli-starter/issues"
  },
  "homepage": "https://github.com/soulmachine/ts-cli-starter"
}
```

Install TypeScript compiler:

```bash
npm install typescript --save-dev
```

Make TypeScript outputs compiled JS files to the directory `dist/`:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

Add a `build` and `start` command in `package.json`:

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "start": "node ./dist/index.js"
  }
}
```

Create a typescript file `./src/index.ts`:

```javascript
console.log('Hello World');
```

Now compile this project with `npm run build` and run it with `npm start`, you'll see `Hello World` printed out！

## 2. Add itself to `PATH`

We can install this CLI project as a command to `PATH` so that it can be used directly in terminal.

First add the following line at the beginning of `index.ts`:

```text
#!/usr/bin/env node
```

Then add a `bin` field in `package.json`:

```json
"bin": "dist/index.js"
```

Run `npm link` and type the command `ts-cli-starter` in terminal, you'll also see `Hello World` printed out！

## 3. Configure TypeScript in tsconfig.json

All compiler options are configured in `tsconfig.json`.

Note:

- Make sure set "module" to "commonjs". Because Node.js runtime only recognizes CommonJS format, and it doesn't support `import`.

Install node types which is needed by all Node.js projects:

```bash
npm install @types/node --save-dev
```

## 4. `.editorconfig`

EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

Add a new file `.editoconfig` at the root directory of this project:

```ini
# https://EditorConfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

# Markdown Files
[*.md]
trim_trailing_whitespace = false

# Batch Files
[*.{cmd,bat}]
end_of_line = crlf
```

There are two special rules:

- Do NOT trim trailing whtespaces for Markdown files.
- Windows batch files(`.cmd` and `.bat`) require `CRLF` line endings.

Add a `.gitattributes` file to the root of your repository to force everything to be `LF`, except for Windows batch files that require `CRLF`:

```text
* text=auto eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
```

## 5. ESLint

Install `eslint` and `typescript-eslint` packages:

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-airbnb-base --save-dev
```

Install plugins:

```bash
npm install eslint-plugin-import eslint-plugin-jest eslint-plugin-markdown --save-dev
```

Configure ESLint in file`.eslintrc.js`.

Note:

- Set `parser` to `@typescript-eslint/parser`
- Add `@typescript-eslint` to `plugins`

Add a command inside `scripts` field:

```json
"scripts" {
  "lint": "eslint . --ext '.js,.jsx,.ts,.tsx,.md'",
}
```

Add a file `.eslintignore` to ignore several files and directories.

## 6. Prettier

Install:

```bash
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

Add the following config to `.eslintrc.js` to intergrate with ESLint:

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

Then set Prettier's own options inside a `.prettierrc` file.

Add a command in `scripts`:

```json
"prettier": "prettier -c --write '**/*'",
```

Make VS Code formats code automatically on save:

```json
"files.autoSave": "onFocusChange",
"eslint.autoFixOnSave": true,
"editor.formatOnSave": true,
```

Add a file `.prettierignore` to ignore several file types.

For more details see <https://prettier.io/docs/en/integrating-with-linters.html>.

## 7. Must-have libraries

### 7.1 Parse command line arguments

Install `yargs`:

```bash
npm install yargs --save
npm install @types/yargs --save-dev
```

Added the following code to `./src/index.ts`:

```typescript
import yargs from 'yargs';

const argv = yargs.options({
  a: { type: 'boolean', default: false },
  b: { type: 'string', demandOption: true },
  c: { type: 'number', alias: 'chill' },
  d: { type: 'array' },
  e: { type: 'count' },
  f: { choices: ['1', '2', '3'] },
}).argv;

console.info(argv);
```

### 7.2 Colorize text on terminal

Install`chalk` :

```bash
npm install chalk --save
npm install @types/chalk --save-dev
```

Add the following code to `./src/index.ts`:

```typescript
import chalk from 'chalk';

console.info(chalk.green('Green text'));
```

### 7.3 ASCII banner

Install `figlet`:

```bash
npm install figlet --save
npm install @types/figlet --save-dev
```

Add the following code to `./src/index.ts`:

```typescript
import figlet from 'figlet';

console.log(chalk.green(figlet.textSync('ts-cli-starter')));
```

## 8. Publish to npm

First, use a `.npmignore` file to keep stuff out of your package. See [Keeping files out of your package](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package) to learn more about `.npmignore`.

Second, run `npm login` to login.

Last, run `npm publish` to publish your package to npm.

## References

- [bitjson/typescript-starter](https://github.com/bitjson/typescript-starter)
- [Recommended Configuration - eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier#recommended-configuration)
- [ant-design](https://github.com/ant-design/ant-design)
