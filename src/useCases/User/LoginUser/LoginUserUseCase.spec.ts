import { ILoginUserRequestDTO } from './LoginUserDTO'
import { UserError } from '@util/errors'
import { UserRepositorySpy } from '../mocks/UserRepositorySpy'
import { makeFakeUser, makeFakeUserData } from '@util/makeFaker'
import { LoginUserUseCase } from './LoginUserUseCase'

const makeUserData = makeFakeUserData()
const makeUser = makeFakeUser(
  makeUserData.document,
  makeUserData.email,
  makeUserData.name,
  makeUserData.password
)

const makeRequest: ILoginUserRequestDTO = {
  email: makeUserData.email,
  password: makeUserData.password
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

    expect(response.token).toBeTruthy()
  })

  test('Retorna um erro usuário não existe', () => {
    const { sut } = makeSut()
    const promise = sut.execute(makeRequest)
    // eslint-disable-next-line jest/valid-expect
    expect(promise).rejects.toThrow(new UserError("User doesn't exist"))
  })

  test('Retorna um erro senha invalida', () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.user = makeUser
    userRepositorySpy.isValidPassword = false
    const promise = sut.execute(makeRequest)
    // eslint-disable-next-line jest/valid-expect
    expect(promise).rejects.toThrow(new UserError('Invalid password'))
  })
})
