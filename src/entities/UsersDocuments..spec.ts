import { UsersDocuments } from './UsersDocuments'
import { Users } from './Users'
import faker from 'faker'

const makeData = {
  userId: faker.internet.userAgent(),
  creditCardToken: faker.finance.creditCardNumber(),
  value: faker.random.number()
}

describe('Test UsersDocuments Entity', () => {
  test('Cadastra um documento á um usuário', () => {
    const userDocument = new UsersDocuments(makeData)

    expect(userDocument.id).toBeTruthy()
    expect(userDocument.userId).toBe(makeData.userId)
    expect(userDocument.value).toBe(makeData.value)
    expect(
      userDocument.creditCardToken !== makeData.creditCardToken
    ).toBeTruthy()
  })
})
