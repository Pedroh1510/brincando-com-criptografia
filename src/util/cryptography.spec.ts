import { CONFIG } from 'src/config/dotenv'
import { hashString, validateHashedString } from './cryptography'

describe('Test funções token', () => {
  beforeEach(() => {
    jest.resetModules() // most important - it clears the cache
    CONFIG.SECRET_NUMBER = '1'
  })

  test('Gera um token', () => {
    const data = 'test'
    const hash = hashString(data)

    expect(hash).toEqual(expect.not.stringContaining(data))
  })

  test('Hash é valida', async () => {
    const data = 'test'
    const hash = hashString(data)
    const isValid = await validateHashedString(data, hash)

    expect(isValid).toBeTruthy()
  })

  test('Hash é invalida', async () => {
    const isValid = await validateHashedString('hash', 'hash')

    expect(isValid).toBeFalsy()
  })
})
