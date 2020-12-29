import { Request, Response } from 'express'

export interface IControllerDTO {
  handle(request: Request, response: Response)
}
