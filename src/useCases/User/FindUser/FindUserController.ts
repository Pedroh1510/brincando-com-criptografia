import { Request, Response } from 'express'
import { IControllerDTO } from '@util/IControllerDTO'
import { FindUserUseCase } from './FindUserUseCase'
import { IFindUserRequestDTO } from './FindUserDTO'

export class FindUserController implements IControllerDTO {
  constructor(private findUserUseCase: FindUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { body, statusCode } = await this.findUserUseCase.execute(
      (request as unknown) as IFindUserRequestDTO
    )

    return response.status(statusCode).send(body)
  }
}
