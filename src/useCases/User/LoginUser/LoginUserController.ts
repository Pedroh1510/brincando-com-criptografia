import { LoginUserUseCase } from './LoginUserUseCase'
import { Response, Request } from 'express'
import { IControllerDTO } from '@util/IControllerDTO'

export class LoginUserController implements IControllerDTO {
  constructor(private loginUserUseCase: LoginUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = await this.loginUserUseCase.execute(request.body)

      return response.status(200).json(data)
    } catch (error) {
      return response.status(400).send()
    }
  }
}
