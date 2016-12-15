# dva-cli

[![NPM version](https://img.shields.io/npm/v/dva-cli.svg?style=flat)](https://npmjs.org/package/dva-cli)
[![NPM downloads](http://img.shields.io/npm/dm/dva-cli.svg?style=flat)](https://npmjs.org/package/dva-cli)

The dva command line utility.

## Install

```bash
$ npm install -g dva-cli
```

## Usage

### dva init

```bash
$ mkdir myApp && cd myApp
$ dva init
```

### dva new

```bash
$ dva new myApp
$ cd myApp
```

### dva generate (short-cut alias: "g")

```bash
$ dva g route product-list
$ dva g model products
$ dva g component title
$ dva g component title --no-css
```

## Configuration

dva-cli use [roadhog](https://github.com/sorrycc/roadhog) for build and server, view [roadhog#Configuration](https://github.com/sorrycc/roadhog#配置) for details.

## License

[MIT](https://tldrlegal.com/license/mit-license)

