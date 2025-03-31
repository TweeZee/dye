# dye

Dead-Simple, super-smol Template Literal Function for Colorful Console Output

Uses [yoctocolors](https://github.com/sindresorhus/yoctocolors) under the hood.

Usage:
```ts
import { dye } from 'dye';

console.log(dye`${'red'}This is red ${'reset'}and ${this is ${'blue'}`);