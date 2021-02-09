import { UnauthorizedError } from './../../../util/errors'
import { generateToken } from '@util/jwt'
import { AuthUseCase } from './AuthUseCase'
import { CONFIG } from 'src/config/dotenv'

const makeSut = () => {
  const sut = new AuthUseCase()
  return { sut }
}

describe('Test Auth UseCase', () => {
  beforeEach(() => {
    jest.resetModules() // most important - it clears the cache
    CONFIG.SECRET = 'test'
    CONFIG.SECRET_TIME = '864000'
  })

  test('Autenticação com sucesso', async () => {
    const { sut } = makeSut()
    const response = await sut.execute({
      authorization: generateToken({ userId: 'test' })
    })

    expect(response.userId).toEqual('test')
  })

  test('Autenticação invalida', async () => {
    const { sut } = makeSut()

    const response = sut.execute({
      authorization: 'token_invalid'
    })
    // eslint-disable-next-line jest/valid-expect
    expect(response).rejects.toThrowError(
      new UnauthorizedError('Erro token invalido')
    )
  })
})
