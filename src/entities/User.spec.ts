import { Users } from './Users'
import faker from 'faker'

const makeData = {
  name: faker.name.firstName(1),
  email: faker.internet.email(),
  password: faker.internet.password(),
  document: faker.internet.userAgent()
}

describe('Test User Entity', () => {
  test('Cria um usuário', () => {
    const user = new Users(makeData)

    expect(user.id).toBeTruthy()
    expect(user.email).toBe(makeData.email)
    expect(user.name).toBe(makeData.name)
    expect(user.document !== makeData.document).toBeTruthy()
    expect(user.password !== makeData.password).toBeTruthy()
  })
})
