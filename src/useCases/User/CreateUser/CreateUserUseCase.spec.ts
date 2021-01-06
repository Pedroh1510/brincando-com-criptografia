import { UserError } from '@util/errors'
import { Users } from '@entities/Users'
import { ICreateUserDTO } from './CreateUserDTO'
import { UserRepositorySpy } from './mocks/UserRepositorySpy'
import { CreateUserUseCase } from './CreateUserUseCase'
import faker from 'faker'

const makeRequest: ICreateUserDTO = {
  userEmail: faker.internet.email(),
  userDocument: faker.internet.userAgent(),
  userName: faker.name.firstName(),
  userPassword: faker.internet.password()
}
const makeUser = (): Users => {
  const user = new Users({
    document: makeRequest.userDocument,
    email: makeRequest.userEmail,
    name: makeRequest.userName,
    password: makeRequest.userPassword
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
    const response = await sut.execute(makeRequest)
    expect(response).toBeUndefined()
  })
  test('Retorna um erro usuário ja existe', () => {
    const { sut, userRepositorySpy } = makeSut()
    userRepositorySpy.user = makeUser()
    const promise = sut.execute(makeRequest)
    // eslint-disable-next-line jest/valid-expect
    expect(promise).rejects.toThrow(new UserError('User already exists'))
  })
})
