import { badRequest, forbidden, noContent, serverError } from '@util/httpErrors'
import { IRegisterBuyDTORequest } from './RegisterBuyDTO'
import { BuyRepositorySpy } from '../mocks/BuyRepositorySpy'
import { RegisterBuyUseCase } from './RegisterBuyUseCase'
import { makeFakeUser } from '@util/makeFaker'
import faker from 'faker'
import { MissingParamError, UserError } from '@util/errors'

const makeUser = makeFakeUser()

interface makeRequestDTO {
  card?: string
  value?: string
  token?: string
}

const makeRequest = ({
  card,
  token,
  value
}: makeRequestDTO): IRegisterBuyDTORequest => {
  return {
    body: {
      auth: { userId: makeUser.id },
      card: card === undefined ? faker.finance.creditCardNumber() : card,
      value: value === undefined ? faker.random.number() : parseInt(value),
      token: token === undefined ? faker.internet.password() : token
    }
  }
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
    const response = await sut.execute(makeRequest({}))

    expect(response).toEqual(noContent())
  })

  test('Retorna um erro missingParams value', async () => {
    const { sut, buyRepositorySpy } = makeSut()
    buyRepositorySpy.user = makeUser
    const response = await sut.execute(makeRequest({ value: '' }))

    expect(response).toEqual(badRequest(new MissingParamError('value')))
  })

  test('Retorna um erro missingParams card', async () => {
    const { sut, buyRepositorySpy } = makeSut()
    buyRepositorySpy.user = makeUser
    const response = await sut.execute(makeRequest({ card: '' }))

    expect(response).toEqual(badRequest(new MissingParamError('card')))
  })

  test('Retorna um erro usuário não existe', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeRequest({}))

    expect(response).toEqual(forbidden(new UserError("User doesn't exist")))
  })

  test('Retorna um erro serverError', async () => {
    const { sut, buyRepositorySpy } = makeSut()
    buyRepositorySpy.user = makeUser
    buyRepositorySpy.returnThrow = true
    const response = await sut.execute(makeRequest({}))

    expect(response).toEqual(serverError())
  })
})
