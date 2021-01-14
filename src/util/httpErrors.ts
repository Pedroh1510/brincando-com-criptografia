import { ServerError, UnauthorizedError } from './errors'

export interface HttpResponseDTO {
  statusCode: number
  body: any
}

export const ok = (body?: any): HttpResponseDTO => {
  return {
    statusCode: 200,
    body
  }
}

export const noContent = (): HttpResponseDTO => {
  return {
    statusCode: 201,
    body: null
  }
}

export const badRequest = (error: Error): HttpResponseDTO => {
  return {
    statusCode: 400,
    body: {
      error: error
    }
  }
}

export const forbidden = (error: Error): HttpResponseDTO => ({
  statusCode: 403,
  body: error.message
})

export const unauthorizedError = (): HttpResponseDTO => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export const serverError = (): HttpResponseDTO => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export class HttpResponse {
  static ok(body?: any): HttpResponseDTO {
    return {
      statusCode: 200,
      body
    }
  }

  static noContent(): HttpResponseDTO {
    return {
      statusCode: 201,
      body: {}
    }
  }

  static badRequest(error): HttpResponseDTO {
    return {
      statusCode: 400,
      body: {
        error: error.message
      }
    }
  }

  static unauthorizedError(): HttpResponseDTO {
    return {
      statusCode: 401,
      body: {
        error: new UnauthorizedError().message
      }
    }
  }

  static serverError(): HttpResponseDTO {
    return {
      statusCode: 500,
      body: {
        error: new ServerError().message
      }
    }
  }
}
