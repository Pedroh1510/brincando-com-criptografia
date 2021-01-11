import { MissingParamError } from '@util/errors'
import { IRegisterBuyDTORequest } from './RegisterBuyDTO'
import { IControllerDTO } from '@util/IControllerDTO'
import { Request, Response } from 'express'
import { RegisterBuyUseCase } from './RegisterBuyUseCase'
import { HttpResponse } from '@util/httpErrors'

export class RegisterBuyController implements IControllerDTO {
  constructor(private registerBuyUseCase: RegisterBuyUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const data: IRegisterBuyDTORequest = request.body

    if (!data.card) {
      const error = new MissingParamError('card')
      const httpResponse = HttpResponse.badRequest(error)
      return response.send(httpResponse.statusCode).send(httpResponse.body)
    }
    if (!data.value) {
      const error = new MissingParamError('value')
      const httpResponse = HttpResponse.badRequest(error)
      return response.send(httpResponse.statusCode).send(httpResponse.body)
    }

    try {
      await this.registerBuyUseCase.execute(request.body)

      const httpResponse = HttpResponse.ok()

      return response.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error) {
      console.log(error)

      const httpResponse = HttpResponse.serverError()
      return response.status(httpResponse.statusCode).send(httpResponse.body)
    }
  }
}
