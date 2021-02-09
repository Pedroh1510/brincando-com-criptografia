import { typeOrmHelper } from './repositories/implementations/TypeOrm/helper/typeOrmHelper'
import './config/dotenv'
import app from './app'
import {
  mariaDbTypeOrmConnection,
  sqliteTypeOrmConnection
} from '@repositories/implementations/TypeOrm/config/config'

typeOrmHelper
  .connect(mariaDbTypeOrmConnection)
  .then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is running: ${process.env.PORT}`)
    )
  })
  .catch(err => console.error(err))
