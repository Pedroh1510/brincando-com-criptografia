import { IFindUserRequestDTO } from './FindUserDTO'
import { UserError } from '@util/errors'
import { UserRepositorySpy } from '../mocks/UserRepositorySpy'
import { FindUserUseCase } from './FindUserUseCase'
import { makeFakeUser } from '@util/makeFaker'

const makeUser = makeFakeUser()

const makeRequest: IFindUserRequestDTO = {
  userEmail: makeUser.email
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

    expect(response.userName).toEqual(makeUser.name)
    expect(response.userId).toEqual(makeUser.id)
    expect(response.userEmail).toEqual(makeUser.email)
  })
  test('Retorna um erro usuário não existe', () => {
    const { sut } = makeSut()
    const promise = sut.execute({ userEmail: makeUser.email })
    // eslint-disable-next-line jest/valid-expect
    expect(promise).rejects.toThrow(new UserError("User doesn't exist"))
  })
})
