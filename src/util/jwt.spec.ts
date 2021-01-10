import { generateToken, TokenDTO, validadeToken } from './jwt'

describe('Test funções token', () => {
  beforeEach(() => {
    jest.resetModules() // most important - it clears the cache
    process.env.SECRET = 'test'
    process.env.SECRET_TIME = '864000'
  })

  test('Gera um token', async () => {
    const token = generateToken({ userId: 'test' })

    expect(token).toBeTruthy()
  })

  test('Token ser valido', () => {
    const data: TokenDTO = {
      userId: 'test'
    }
    const token = generateToken(data)
    const response = validadeToken(token)

    expect(response).toEqual(data)
  })

  test('Gera uma exceção', () => {
    const error = 'token invalido'
    expect(() => validadeToken('token', error)).toThrowError(new Error(error))
  })
})
