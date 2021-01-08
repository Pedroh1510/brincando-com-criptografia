import { Users } from '@entities/Users'
import faker from 'faker'

export const makeFakeUser = (
  document = faker.internet.email(),
  email = faker.internet.userAgent(),
  name = faker.name.firstName(),
  password = faker.internet.password()
): Users => {
  const user = new Users({
    document,
    email,
    name,
    password
  })
  return user
}

export const makeFakeUserData = () => {
  return {
    document: faker.internet.email(),
    email: faker.internet.userAgent(),
    name: faker.name.firstName(),
    password: faker.internet.password()
  }
}
