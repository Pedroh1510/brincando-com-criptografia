import { ILoginUserRequestDTO } from './LoginUserDTO'
import { MissingParamError, UserError } from '@util/errors'
import { UserRepositorySpy } from '../mocks/UserRepositorySpy'
import { makeFakeUser, makeFakeUserData } from '@util/makeFaker'
import { LoginUserUseCase } from './LoginUserUseCase'
import { badRequest, forbidden, ok, serverError } from '@util/httpErrors'

const makeUserData = makeFakeUserData()
const makeUser = makeFakeUser(
  makeUserData.document,
  makeUserData.email,
  makeUserData.name,
  makeUserData.password
)

const makeRequest: ILoginUserRequestDTO = {
  body: {
    email: makeUserData.email,
    password: makeUserData.password
  }
}
const makeSut = () => {
  const userRepositorySpy = new UserRepositorySpy()
  const sut = new LoginUserUseCase(userRepositorySpy)
  return { sut, userRepositorySpy }
}

describe('Test Login User UseCase', () => {
  beforeEach(() => {
    jest.resetModules() // most important - it clears the cache
    process.env.SECRET = 'test'
    process.env.SECRET_TIME = '864000'
    process.env.SECRET_NUMBER = '10'
  })

  test('Realiza o login de um usuário', async () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.user = makeUser
    const response = await sut.execute(makeRequest)

    expect(response).toEqual(ok({ token: userRepositorySpy.user.token }))
  })

  test('Retorna um erro usuário não existe', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeRequest)

    expect(response).toEqual(forbidden(new UserError("User doesn't exist")))
  })

  test('Retorna um erro MissingParamError email', async () => {
    const { sut } = makeSut()
    const response = await sut.execute({ body: { email: '', password: 'any' } })

    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Retorna um erro MissingParamError password', async () => {
    const { sut } = makeSut()
    const response = await sut.execute({ body: { email: 'any', password: '' } })

    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })

  test("Retorna um erro UserError User doesn't exist", async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeRequest)

    expect(response).toEqual(forbidden(new UserError("User doesn't exist")))
  })

  test('Retorna um erro severError', async () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.returnThrow = true
    const response = await sut.execute(makeRequest)

    expect(response).toEqual(serverError())
  })
})
