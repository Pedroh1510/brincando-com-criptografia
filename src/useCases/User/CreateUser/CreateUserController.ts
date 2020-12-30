import { IControllerDTO } from '@util/IControllerDTO'
import { CreateUserUseCase } from './CreateUserUseCase'
import { Request, Response } from 'express'

export class CreateUserController implements IControllerDTO {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    try {
      await this.createUserUseCase.execute(data)

      return response.status(201).send()
    } catch (err) {
      return response.status(400).send(err)
    }
  }
}
