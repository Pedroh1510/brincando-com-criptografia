import { sqliteTypeOrmConnection } from './repositories/implementations/TypeOrm/config'
import { typeOrmHelper } from './repositories/implementations/TypeOrm/helper/typeOrmHelper'
import './config/dotenv'
import app from './app'

typeOrmHelper.connect(sqliteTypeOrmConnection).then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Server is running: ${process.env.PORT}`)
  )
})
