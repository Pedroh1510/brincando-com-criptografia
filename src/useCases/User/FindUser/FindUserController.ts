import { Request, Response } from 'express'
import { IControllerDTO } from './../../../util/IControllerDTO'
import { FindUserUseCase } from './FindUserUseCase'

export class FindUserController implements IControllerDTO {
  constructor(private findUserUseCase: FindUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = await this.findUserUseCase.execute(request.body)

      response.status(200).json(data)
    } catch (error) {
      return response.status(400).send()
    }
  }
}
