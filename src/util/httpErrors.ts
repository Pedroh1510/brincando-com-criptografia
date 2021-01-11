import { ServerError, UnauthorizedError } from './errors'

interface HttpResponseDTO {
  statusCode: number
  body: any
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
