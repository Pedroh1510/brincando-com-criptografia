export class UserError extends Error {
  constructor(paramName: string) {
    super(`User Error: ${paramName}`)
    this.name = 'UserError'
    this.message = `User Error: ${paramName}`
  }
}

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing Param Error: ${paramName}`)
    this.name = 'MissingParamError'
    this.message = `Missing Param : ${paramName}`
  }
}

export class ServerError extends Error {
  constructor() {
    super('Internal error')
    this.name = 'ServerError'
  }
}

export class UnauthorizedError extends Error {
  constructor(paramName?: string) {
    super(`Unauthorized ${paramName}`)
    this.name = 'UnauthorizedError'
  }
}
