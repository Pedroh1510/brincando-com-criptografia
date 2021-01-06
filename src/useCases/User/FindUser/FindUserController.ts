import { IFindUserRequestDTO } from './FindUserDTO'
import { Request, Response } from 'express'
import { IControllerDTO } from '@util/IControllerDTO'
import { FindUserUseCase } from './FindUserUseCase'
import { MissingParamError } from '@util/errors'
import { HttpResponse } from '@util/httpErrors'

export class FindUserController implements IControllerDTO {
  constructor(private findUserUseCase: FindUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const data: IFindUserRequestDTO = request.body

    if (!data.userEmail) {
      const error = new MissingParamError('userEmail')
      const httpResponse = HttpResponse.badRequest(error)
      return response.send(httpResponse.statusCode).send(httpResponse.body)
    }

    try {
      const content = await this.findUserUseCase.execute(request.body)

      const httpResponse = HttpResponse.ok(content)

      return response.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error) {
      const httpResponse = HttpResponse.serverError()
      return response.status(httpResponse.statusCode).send(httpResponse.body)
    }
  }
}
