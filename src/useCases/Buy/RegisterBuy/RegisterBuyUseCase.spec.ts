import { IRegisterBuyDTORequest } from './RegisterBuyDTO'
import { BuyRepositorySpy } from '../mocks/BuyRepositorySpy'
import { RegisterBuyUseCase } from './RegisterBuyUseCase'
import { makeFakeUser } from '@util/makeFaker'
import faker from 'faker'
import { UserError } from '@util/errors'

const makeUser = makeFakeUser()

const makeRequest: IRegisterBuyDTORequest = {
  auth: { userId: makeUser.id },
  card: faker.finance.creditCardNumber(),
  value: faker.random.number(),
  token: faker.internet.password()
}
const makeSut = () => {
  const buyRepositorySpy = new BuyRepositorySpy()
  const sut = new RegisterBuyUseCase(buyRepositorySpy)
  return { sut, buyRepositorySpy }
}

describe('Test Register Buy UseCase', () => {
  beforeEach(() => {
    jest.resetModules() // most important - it clears the cache
    process.env.SECRET = 'test'
    process.env.SECRET_TIME = '864000'
    process.env.SECRET_NUMBER = '10'
  })

  test('Realiza a compra', async () => {
    const { sut, buyRepositorySpy } = makeSut()
    buyRepositorySpy.user = makeUser
    const response = await sut.execute(makeRequest)

    expect(response).toBeUndefined()
  })

  test('Retorna um erro usuário não existe', () => {
    const { sut } = makeSut()
    const promise = sut.execute(makeRequest)
    // eslint-disable-next-line jest/valid-expect
    expect(promise).rejects.toThrow(new UserError("User doesn't exist"))
  })
})
