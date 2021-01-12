import { initIntegrationTest } from './util/testUtil'
import request from 'supertest'
import { makeFakeUserData } from '@util/makeFaker'
import app from './app'
import { typeOrmHelper } from '@repositories/implementations/TypeOrm/helper/typeOrmHelper'

const makeData = makeFakeUserData()

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
}: makeRequestDTO) => {
  return {
    userDocument: userDocument || makeData.document,
    userEmail: userEmail || makeData.email,
    userName: userName || makeData.name,
    userPassword: userPassword || makeData.password
  }
}

describe('Test integration app post /users', () => {
  initIntegrationTest()

  test('Create user', async () => {
    const response = await request(app).post('/users').send(makeRequest({}))

    expect(response.status).toBe(201)
  })

  test('Create user return error invalid email', async () => {
    const response = await request(app)
      .post('/users')
      .send(makeRequest({ userEmail: 'invalid email' }))

    expect(response.status).toBe(400)
  })

  test('Create user return error invalid name', async () => {
    const response = await request(app)
      .post('/users')
      .send(makeRequest({ userName: '.' }))

    expect(response.status).toBe(400)
  })

  test('Create user return error invalid password', async () => {
    const response = await request(app)
      .post('/users')
      .send(makeRequest({ userName: '.' }))

    expect(response.status).toBe(400)
  })

  test('Create user return error invalid document', async () => {
    const response = await request(app)
      .post('/users')
      .send(makeRequest({ userDocument: '.' }))

    expect(response.status).toBe(400)
  })
  test('Create user return server error', async () => {
    await typeOrmHelper.disconnect()
    const response = await request(app).post('/users').send(makeRequest({}))

    expect(response.status).toBe(500)
  })
})

describe('Test integration app get /users', () => {
  initIntegrationTest()

  test('Get data for user', async () => {
    const { userEmail } = makeRequest({})
    await request(app).post('/users').send(makeRequest({}))

    const response = await request(app).get(`/users?userEmail=${userEmail}`)

    expect(response.status).toBe(200)
    expect(response.body.userEmail).toBe(makeRequest({}).userEmail)
  })

  test('Get data return error invalid email', async () => {
    const userEmail = 'invalid'
    const response = await request(app).get(`/users?userEmail=${userEmail}`)

    expect(response.status).toBe(400)
  })

  test('Get data return serverError', async () => {
    await typeOrmHelper.disconnect()
    const { userEmail } = makeRequest({})
    const response = await request(app).get(`/users?userEmail=${userEmail}`)

    expect(response.status).toBe(500)
  })
})

describe('Test integration app post /users/login', () => {
  const makeRequestLogin = ({ userEmail, userPassword }: makeRequestDTO) => {
    return {
      email: userEmail || makeData.email,
      password: userPassword || makeData.password
    }
  }
  initIntegrationTest()

  test('Login user', async () => {
    await request(app).post('/users').send(makeRequest({}))
    const response = await request(app)
      .post('/users/login')
      .send(makeRequestLogin({}))

    expect(response.status).toBe(200)
    expect(response.body.token).toBeTruthy()
  })

  test('Login user return error invalid email', async () => {
    const response = await request(app)
      .post('/users/login')
      .send(makeRequestLogin({ userEmail: 'invalid email' }))

    expect(response.status).toBe(400)
  })

  test('Login user return server error', async () => {
    await request(app).post('/users').send(makeRequest({}))
    await typeOrmHelper.disconnect()
    const response = await request(app)
      .post('/users/login')
      .send(makeRequestLogin({}))

    expect(response.status).toBe(500)
  })
})
