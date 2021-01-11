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

    if (!data.userEmail) {
      const error = new MissingParamError('userEmail')
      const httpResponse = HttpResponse.badRequest(error)
      return response.send(httpResponse.statusCode).send(httpResponse.body)
    }
    if (!data.userDocument) {
      const error = new MissingParamError('userDocument')
      const httpResponse = HttpResponse.badRequest(error)
      return response.send(httpResponse.statusCode).send(httpResponse.body)
    }
    if (!data.userName) {
      const error = new MissingParamError('userName')
      const httpResponse = HttpResponse.badRequest(error)
      return response.send(httpResponse.statusCode).send(httpResponse.body)
    }
    if (!data.userPassword) {
      const error = new MissingParamError('userPassword')
      const httpResponse = HttpResponse.badRequest(error)
      return response.send(httpResponse.statusCode).send(httpResponse.body)
    }

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
