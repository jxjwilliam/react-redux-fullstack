### Q&A:

1. Besides using `karma + karma-conf.js`, a simple way to test:

```bash
./node_modules/mocha/bin/mocha --compilers js:babel-core/register --recursive
```
This command tells Mocha to recursively find all tests from the project and run them. It uses Babel to transpile ES6 code before running it.

or put in package.json:
```javascript
"scripts": {
  "test": "mocha --compilers js:babel-core/register --recursive",
  "test:watch": "npm run test -- --watch"
},
```
