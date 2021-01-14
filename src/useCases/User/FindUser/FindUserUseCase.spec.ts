import { IFindUserRequestDTO } from './FindUserDTO'
import { UserRepositorySpy } from '../mocks/UserRepositorySpy'
import { FindUserUseCase } from './FindUserUseCase'
import { makeFakeUser } from '@util/makeFaker'
import { badRequest, forbidden, ok, serverError } from '@util/httpErrors'
import { MissingParamError, UserError } from '@util/errors'

const makeUser = makeFakeUser()

const makeRequest: IFindUserRequestDTO = {
  query: {
    userEmail: makeUser.email
  }
}

const expectResponse = {
  userEmail: makeUser.email,
  userId: makeUser.id,
  userName: makeUser.name
}

const makeSut = () => {
  const userRepositorySpy = new UserRepositorySpy()
  const sut = new FindUserUseCase(userRepositorySpy)
  return { sut, userRepositorySpy }
}

describe('Test Find User UseCase', () => {
  test('Procura um usuário', async () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.user = makeUser
    const response = await sut.execute(makeRequest)

    expect(response).toEqual(ok(expectResponse))
  })

  test('Retorna um erro MissingParamError userEmail', async () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.user = makeUser
    const response = await sut.execute({ query: { userEmail: '' } })

    expect(response).toEqual(badRequest(new MissingParamError('userEmail')))
  })

  test('Retorna um erro forbidden User already exists', async () => {
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
