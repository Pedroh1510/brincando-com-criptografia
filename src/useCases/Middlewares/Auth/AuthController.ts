import { IAuthDTORequest } from './AuthDTO'
import { NextFunction, Request, Response } from 'express'
import { AuthUseCase } from './AuthUseCase'

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      await this.authUseCase.execute(
        (request.headers as unknown) as IAuthDTORequest
      )
      return next()
    } catch (error) {
      return response.status(401).send(error)
    }
  }
}
