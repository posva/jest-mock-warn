# jest-mock-warn [![npm package](https://badgen.net/npm/v/jest-mock-warn)](https://www.npmjs.com/package/jest-mock-warn)

> mock `console.warn`

## Installation

```sh
yarn add -D jest-mock-warn
```

## Usage

```js
import { mockWarn } from 'jest-mock-warn'

function myFunction() {
  if (!arguments.length) console.warn('provide an argument')
}

describe('my tests', () => {
  mockWarn()
  it('warns when called without arguments', () => {
    myFunction()
    expect('provide an argument').toHaveBeenWarned()
    expect('provide an argument').toHaveBeenWarnedTimes(1)
    expect('provide an argument').toHaveBeenLastWarned()
  })
})
```

## API

- `toHaveBeenWarned()`
- `toHaveBeenWarnedLast()`
- `toHaveBeenWarnedTimes(n: number)`

## License

[MIT](http://opensource.org/licenses/MIT)
