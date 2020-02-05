exports.mockWarn = function mockWarn() {
  expect.extend({
    /**
     *
     * @param {string} received
     */
    toHaveBeenWarned(received) {
      asserted.add(received)
      const passed = warn.mock.calls.some(
        args => args[0].indexOf(received) > -1
      )
      if (passed) {
        return {
          pass: true,
          message: () => `expected "${received}" not to have been warned.`,
        }
      } else {
        const msgs = warn.mock.calls.map(args => args[0]).join('\n - ')
        return {
          pass: false,
          message: () =>
            `expected "${received}" to have been warned.\n\nActual messages:\n\n - ${msgs}`,
        }
      }
    },

    /**
     *
     * @param {string} received
     */
    toHaveBeenWarnedLast(received) {
      asserted.add(received)
      const passed =
        warn.mock.calls[warn.mock.calls.length - 1][0].indexOf(received) > -1
      if (passed) {
        return {
          pass: true,
          message: () => `expected "${received}" not to have been warned last.`,
        }
      } else {
        const msgs = warn.mock.calls.map(args => args[0]).join('\n - ')
        return {
          pass: false,
          message: () =>
            `expected "${received}" to have been warned last.\n\nActual messages:\n\n - ${msgs}`,
        }
      }
    },

    /**
     *
     * @param {string} received
     * @param {number} n
     */
    toHaveBeenWarnedTimes(received, n) {
      asserted.add(received)
      let found = 0
      warn.mock.calls.forEach(args => {
        if (args[0].indexOf(received) > -1) {
          found++
        }
      })

      if (found === n) {
        return {
          pass: true,
          message: () =>
            `expected "${received}" to have been warned ${n} times.`,
        }
      } else {
        return {
          pass: false,
          message: () =>
            `expected "${received}" to have been warned ${n} times but got ${found}.`,
        }
      }
    },
  })

  /** @type {import('jest').SpyInstance} */
  let warn
  /** @type {Set<string>} */
  const asserted = new Set()

  beforeEach(() => {
    asserted.clear()
    warn = jest.spyOn(console, 'warn')
    warn.mockImplementation(() => {})
  })

  afterEach(() => {
    const assertedArray = Array.from(asserted)
    const nonAssertedWarnings = warn.mock.calls
      .map(args => args[0])
      .filter(received => {
        return !assertedArray.some(assertedMsg => {
          return received.indexOf(assertedMsg) > -1
        })
      })
    warn.mockRestore()
    if (nonAssertedWarnings.length) {
      nonAssertedWarnings.forEach(warning => {
        console.warn(warning)
      })
      throw new Error(`test case threw unexpected warnings.`)
    }
  })
}
