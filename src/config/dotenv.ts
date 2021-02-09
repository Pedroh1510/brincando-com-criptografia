import { resolve } from 'path'

import { config } from 'dotenv-safe'

config({ path: resolve(__dirname, '../../.env') })

export const CONFIG = {
  SECRET: process.env.SECRET,
  SECRET_TIME: process.env.SECRET_TIME,
  SECRET_NUMBER: process.env.SECRET_NUMBER,
  PORT: process.env.PORT,
  MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_USERNAME: process.env.MYSQL_USERNAME,
  MYSQL_HOST: process.env.MYSQL_HOST
}
