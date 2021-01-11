export class UserError extends Error {
  constructor(paramName: string) {
    super(`User Error: ${paramName}`)
    this.name = 'UserError'
  }
}

export class ServerError extends Error {
  constructor() {
    super('Internal error')
    this.name = 'ServerError'
  }
}

export class UnauthorizedError extends Error {
  constructor(paramName: string) {
    super(`Unauthorized ${paramName}`)
    this.name = 'UnauthorizedError'
  }
}

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`MissingParamError: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
