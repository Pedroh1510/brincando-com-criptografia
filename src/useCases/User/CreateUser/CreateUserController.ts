import { CreateUserUseCase } from './CreateUserUseCase'
import { IControllerDTO } from '@util/IControllerDTO'
import { Request, Response } from 'express'

export class CreateUserController implements IControllerDTO {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { body, statusCode } = await this.createUserUseCase.execute(request)

    return response.status(statusCode).send(body)
  }
}
