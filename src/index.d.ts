declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveBeenWarned(): R
      toHaveBeenWarnedLast(): R
      toHaveBeenWarnedTimes(n: number): R
    }
  }
}

export declare function mockWarn(): void
