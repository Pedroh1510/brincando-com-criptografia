import { MissingParamError, UserError } from '@util/errors'
import { Users } from '@entities/Users'
import { ICreateUserDTORequest } from './CreateUserDTO'
import { CreateUserUseCase } from './CreateUserUseCase'
import faker from 'faker'
import { UserRepositorySpy } from '../mocks/UserRepositorySpy'
import { badRequest, forbidden, noContent } from '@util/httpErrors'
import { makeFakeUserData } from '@util/makeFaker'

interface makeRequestDTO {
  userDocument?: string
  userEmail?: string
  userName?: string
  userPassword?: string
}

const makeRequest = ({
  userDocument,
  userEmail,
  userName,
  userPassword
}: makeRequestDTO): ICreateUserDTORequest => {
  return {
    body: {
      userDocument:
        userDocument === undefined ? makeData.document : userDocument,
      userEmail: userEmail === undefined ? makeData.email : userEmail,
      userName: userName === undefined ? makeData.name : userName,
      userPassword:
        userPassword === undefined ? makeData.password : userPassword
    }
  }
}

const makeData = makeFakeUserData()

const makeUser = (): Users => {
  const user = new Users({
    document: faker.internet.userAgent(),
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.internet.password()
  })
  return user
}

const makeSut = () => {
  const userRepositorySpy = new UserRepositorySpy()
  const sut = new CreateUserUseCase(userRepositorySpy)
  return { sut, userRepositorySpy }
}

describe('Test Create User UseCase', () => {
  test('Cadastra um usuário', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeRequest({}))
    expect(response).toEqual(noContent())
  })

  test('Retorna um erro usuário ja existe', async () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.user = makeUser()
    const response = await sut.execute(makeRequest({}))

    expect(response).toEqual(forbidden(new UserError('User already exists')))
  })

  test('Retorna um erro MissingParamError userDocument', async () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.user = makeUser()
    const response = await sut.execute(makeRequest({ userDocument: '' }))

    expect(response).toEqual(badRequest(new MissingParamError('userDocument')))
  })

  test('Retorna um erro MissingParamError userName', async () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.user = makeUser()
    const response = await sut.execute(makeRequest({ userName: '' }))

    expect(response).toEqual(badRequest(new MissingParamError('userName')))
  })

  test('Retorna um erro MissingParamError userEmail', async () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.user = makeUser()
    const response = await sut.execute(makeRequest({ userEmail: '' }))

    expect(response).toEqual(badRequest(new MissingParamError('userEmail')))
  })

  test('Retorna um erro MissingParamError userPassword', async () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.user = makeUser()
    const response = await sut.execute(makeRequest({ userPassword: '' }))

    expect(response).toEqual(badRequest(new MissingParamError('userPassword')))
  })
})
