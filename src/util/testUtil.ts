import { sqliteTypeOrmConnectionTest } from '@repositories/implementations/TypeOrm/config/config'
import { typeOrmHelper } from '@repositories/implementations/TypeOrm/helper/typeOrmHelper'

export const initIntegrationTest = () => {
  beforeAll(async () => {
    await typeOrmHelper.connect(sqliteTypeOrmConnectionTest)
  })

  afterAll(async () => {
    await typeOrmHelper.clear()
    await typeOrmHelper.disconnect()
  })

  beforeEach(async () => {
    await typeOrmHelper.clear()
    process.env.SECRET_TIME = '30000'
    process.env.SECRET = 'test'
    process.env.SECRET_NUMBER = '1'
  })
}
