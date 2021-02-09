import { typeOrmHelper } from './repositories/implementations/TypeOrm/helper/typeOrmHelper'
import { CONFIG } from './config/dotenv'
import app from './app'
import { mariaDbTypeOrmConnection } from '@repositories/implementations/TypeOrm/config/config'

typeOrmHelper
  .connect(mariaDbTypeOrmConnection)
  .then(async () => {
    app.listen(CONFIG.PORT, () =>
      console.log(`Server is running: ${CONFIG.PORT}`)
    )
  })
  .catch(err => console.error(err))
