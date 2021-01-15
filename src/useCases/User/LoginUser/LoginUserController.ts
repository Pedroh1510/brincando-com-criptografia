import { LoginUserUseCase } from './LoginUserUseCase'
import { Response, Request } from 'express'
import { IControllerDTO } from '@util/IControllerDTO'

export class LoginUserController implements IControllerDTO {
  constructor(private loginUserUseCase: LoginUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { body, statusCode } = await this.loginUserUseCase.execute(request)

    return response.status(statusCode).send(body)
  }
}
