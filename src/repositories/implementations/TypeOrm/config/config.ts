import {
  UsersDocumentsTypeOrm,
  UsersTypeOrm
} from '@entities/implementations/TypeOrm'
import { ConnectionOptions } from 'typeorm'

import { resolve } from 'path'
import { CONFIG } from 'src/config/dotenv'
export const sqliteTypeOrmConnection: ConnectionOptions = {
  type: 'sqlite',
  database: resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '..',
    'database',
    'sqlite',
    'data.sqlite'
  ),
  entities: [UsersDocumentsTypeOrm, UsersTypeOrm],
  synchronize: true
}

export const sqliteTypeOrmConnectionTest: ConnectionOptions = {
  type: 'sqlite',
  database: resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '..',
    'database',
    'test',
    'test.sqlite'
  ),
  entities: [UsersDocumentsTypeOrm, UsersTypeOrm],
  synchronize: true
}

export const mariaDbTypeOrmConnection: ConnectionOptions = {
  type: 'mariadb',
  host: CONFIG.MYSQL_HOST,
  port: 3306,
  username: CONFIG.MYSQL_USERNAME,
  password: CONFIG.MYSQL_ROOT_PASSWORD,
  database: CONFIG.MYSQL_DATABASE,
  entities: [UsersDocumentsTypeOrm, UsersTypeOrm],
  synchronize: true
}
