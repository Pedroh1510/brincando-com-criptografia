import { sqliteTypeOrmConnection } from './repositories/implementations/TypeOrm/config'
import { typeOrmHelper } from './repositories/implementations/TypeOrm/helper/typeOrmHelper'
import app from './app'

typeOrmHelper.connect(sqliteTypeOrmConnection).then(async () => {
  app.listen(3333, () => console.log('Server is running'))
})
