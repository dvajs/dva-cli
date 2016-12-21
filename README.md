# dva-cli
[![NPM version](https://img.shields.io/npm/v/dva-cli.svg?style=flat)](https://npmjs.org/package/dva-cli)
[![NPM downloads](http://img.shields.io/npm/dm/dva-cli.svg?style=flat)](https://npmjs.org/package/dva-cli)

CLI for [dva](https://github.com/dvajs/dva) .

## Getting Started

Install, create and start.

```bash
# Install
$ npm install dva-cli -g

# Create app
$ dva new myapp

# Start app
$ cd myapp
$ npm start
```

## Commands

We have 3 commands: `new`, `init` and `generate`(alias `g`).

### dva new <appName> [options]

Create app with new directory.

#### Usage Examples

```bash
$ dva new myapp
$ dva new myapp --demo
$ dva new myapp --no-install
```

#### options

* `--demo` -- Generate a dead simple project for quick prototype
* `--no-install` -- Disable npm install after files created

### dva init [options]

Create app in current directory. It's options is the same as `dva new`.

### dva generate <type> <name> (short-cut alias: "g")

Generate route, model and component.

#### Usage Examples

```bash
$ dva g route product-list
$ dva g model products
$ dva g component Editor
$ dva g component Users/UserModal
$ dva g component Header --no-css
```

## Generated File Tree

```bash
.
├── src                    # Source directory
    ├── assets             # Store images, icons, ...
    ├── components         # UI components
    ├── index.css          # CSS for entry file
    ├── index.html         # HTML for entry file
    ├── index.js           # Enry file
    ├── models             # Dva models
    ├── router.js          # Router configuration
    ├── routes             # Route components
    ├── services           # Used for communicate with server
    └── utils              # Utils
        └── request.js     # A util wrapped dva/fetch
├── .editorconfig          #
├── .eslintrc              # Eslint config
├── .gitignore             #
├── .roadhogrc             # Roadhog config
└── package.json           #
```

## Configuration

dva-cli use [roadhog](https://github.com/sorrycc/roadhog) for build and server, view [roadhog#Configuration](https://github.com/sorrycc/roadhog/blob/master/README_en-us.md#configuration) ([中文版](https://github.com/sorrycc/roadhog#配置)) for details.

## License

[MIT](https://tldrlegal.com/license/mit-license)
