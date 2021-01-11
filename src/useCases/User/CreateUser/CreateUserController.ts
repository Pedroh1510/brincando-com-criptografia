import { MissingParamError } from './../../../util/errors'
import { IControllerDTO } from '@util/IControllerDTO'
import { CreateUserUseCase } from './CreateUserUseCase'
import { Request, Response } from 'express'
import { ICreateUserDTO } from './CreateUserDTO'
import { HttpResponse } from '@util/httpErrors'

export class CreateUserController implements IControllerDTO {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateUserDTO = request.body

    try {
      await this.createUserUseCase.execute(data)

      const httpResponse = HttpResponse.noContent()

      return response.status(httpResponse.statusCode).send(httpResponse.body)
    } catch (err) {
      const httpResponse = HttpResponse.serverError()
      return response.status(httpResponse.statusCode).send(httpResponse.body)
    }
  }
}
