import {
  UsersDocumentsTypeOrm,
  UsersTypeOrm
} from '@entities/implementations/TypeOrm'
import { UsersDocuments } from '@entities/UsersDocuments'

import { Users } from '@entities/Users'
import { IBuyRepository } from '@repositories/IBuyRepository'
import { typeOrmHelper } from './helper/typeOrmHelper'

export class BuyRepository implements IBuyRepository {
  private connectionDb = typeOrmHelper.connection
  async findUserById(id: string): Promise<Users> {
    const user: Users = await this.connectionDb
      .getRepository(UsersTypeOrm)
      .findOne({ where: { id } })

    return user
  }

  async save(document: UsersDocuments): Promise<void> {
    const userDocument = new UsersDocumentsTypeOrm(document)

    await this.connectionDb.manager.save(userDocument)
  }
}
