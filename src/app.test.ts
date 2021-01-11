import { sqliteTypeOrmConnectionTest } from './repositories/implementations/TypeOrm/config/config'
import request from 'supertest'
import { makeFakeUserData } from '@util/makeFaker'
import app from './app'
import { typeOrmHelper } from '@repositories/implementations/TypeOrm/helper/typeOrmHelper'

const makeData = makeFakeUserData()

const makeRequest = {
  userDocument: makeData.document,
  userEmail: makeData.email,
  userName: makeData.name,
  userPassword: makeData.password
}

describe('Test integration app post /users', () => {
  beforeAll(async () => {
    await typeOrmHelper.connect(sqliteTypeOrmConnectionTest)
  })

  afterAll(async () => {
    await typeOrmHelper.clear()
    await typeOrmHelper.disconnect()
  })

  beforeEach(async () => {
    await typeOrmHelper.clear()
  })

  test('Create user', async () => {
    const response = await request(app).post('/users').send(makeRequest)

    expect(response.status).toBe(201)
  })

  test('Create user return error invalid email', async () => {
    const { userDocument, userName, userPassword } = makeRequest
    const userEmail = 'invalid email'
    const response = await request(app)
      .post('/users')
      .send({ userDocument, userName, userPassword, userEmail })

    expect(response.status).toBe(400)
  })

  test('Create user return error invalid name', async () => {
    const { userDocument, userEmail, userPassword } = makeRequest
    const userName = ''
    const response = await request(app)
      .post('/users')
      .send({ userDocument, userName, userPassword, userEmail })

    expect(response.status).toBe(400)
  })

  test('Create user return error invalid password', async () => {
    const { userDocument, userName, userEmail } = makeRequest
    const userPassword = ''
    const response = await request(app)
      .post('/users')
      .send({ userDocument, userName, userPassword, userEmail })

    expect(response.status).toBe(400)
  })

  test('Create user return error invalid document', async () => {
    const { userEmail, userName, userPassword } = makeRequest
    const userDocument = 'erro'
    const response = await request(app)
      .post('/users')
      .send({ userDocument, userName, userPassword, userEmail })

    expect(response.status).toBe(400)
  })
})
