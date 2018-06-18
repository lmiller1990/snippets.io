## Snippets

Easily insert source code into documentation.

### Installation

```
npm install -g @lmiller1990/snippets
```

### Usage

Let's say we are writing some documentation about webpack. We want to reference our file, `webpack.config.js`, in our documentation. It looks like this:

```js
const path = require("path")

module.exports = {
  entry: "./src/index.js"
}
```

In this example, the source file is `README.md`. You can insert this into any file by using the following syntax:

```
My webpack config:

//# master:webpack.config.js
```

And generate the output file by runinng `snippets README.me`. This produces:

``` 
My webpack config:

```js
const path = require("path")

module.exports = {
  entry: "./src/index.js"
}
```
```

Snippets uses git to checkout files, so the code you are referencing needs to be checked into git.

### Options

Formally, the full syntax is:

```
//# [branch]:[file]:[lines]?[commit hash]
```

You can specify which lines you want to use in your snippet like this:

```
//# master:webpack.config.js:1-3,5
```

Which generates:

```js
My webpack config


```js
const path = require("path")

module.exports = {
  // ...
}
```
```

Automatically inserting `// ...` to lines excluded from the snippet.

You can also specify a hash:

```
//# master:resources/webpack.config.js?ed53d197dac5da4a4a38a65bd7231b32fedaa6b1
```
