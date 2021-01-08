import { Users } from '@entities/Users'
import faker from 'faker'

export const makeFakeUser = (): Users => {
  const user = new Users({
    document: faker.internet.email(),
    email: faker.internet.userAgent(),
    name: faker.name.firstName(),
    password: faker.internet.password()
  })
  return user
}
