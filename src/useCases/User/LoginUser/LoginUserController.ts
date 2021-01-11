import { ILoginUserRequestDTO } from './LoginUserDTO'
import { LoginUserUseCase } from './LoginUserUseCase'
import { Response, Request } from 'express'
import { IControllerDTO } from '@util/IControllerDTO'
import { HttpResponse } from '@util/httpErrors'

export class LoginUserController implements IControllerDTO {
  constructor(private loginUserUseCase: LoginUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ILoginUserRequestDTO = request.body

    try {
      const content = await this.loginUserUseCase.execute(data)

      const httpResponse = HttpResponse.ok(content)

      return response.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error) {
      const httpResponse = HttpResponse.serverError()
      return response.status(httpResponse.statusCode).send(httpResponse.body)
    }
  }
}
