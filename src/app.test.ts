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
  test('Create user return server error', async () => {
    await typeOrmHelper.disconnect()
    const response = await request(app).post('/users').send(makeRequest)

    expect(response.status).toBe(500)
  })
})

describe('Test integration app get /users', () => {
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

  test('Get data for user', async () => {
    const { userEmail } = makeRequest
    await request(app).post('/users').send(makeRequest)

    const response = await request(app).get(`/users?userEmail=${userEmail}`)

    expect(response.status).toBe(200)
    expect(response.body.userEmail).toBe(makeRequest.userEmail)
  })

  test('Get data return error invalid email', async () => {
    const userEmail = 'invalid'
    const response = await request(app).get(`/users?userEmail=${userEmail}`)

    expect(response.status).toBe(400)
  })

  test('Get data return serverError', async () => {
    await typeOrmHelper.disconnect()
    const { userEmail } = makeRequest
    const response = await request(app).get(`/users?userEmail=${userEmail}`)

    expect(response.status).toBe(500)
  })
})
