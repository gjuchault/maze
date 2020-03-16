export class SwitchGuardError extends Error {
  constructor(value: never) {
    super(`Unexpected value ${value}`)
  }
}
