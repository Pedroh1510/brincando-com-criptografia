import {
  UsersDocumentsTypeOrm,
  UsersTypeOrm
} from '@entities/implementations/TypeOrm'
import { ConnectionOptions } from 'typeorm'

import { resolve } from 'path'
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
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [UsersDocumentsTypeOrm, UsersTypeOrm],
  synchronize: true
}
