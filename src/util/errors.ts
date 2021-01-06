export class UserError extends Error {
  constructor(paramName: string) {
    super(`User Error: ${paramName}`)
    this.name = 'UserError'
  }
}
