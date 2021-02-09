import { sqliteTypeOrmConnectionTest } from '@repositories/implementations/TypeOrm/config/config'
import { typeOrmHelper } from '@repositories/implementations/TypeOrm/helper/typeOrmHelper'
import { CONFIG } from 'src/config/dotenv'

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
    CONFIG.SECRET_TIME = '30000'
    CONFIG.SECRET = 'test'
    CONFIG.SECRET_NUMBER = '1'
  })
}
