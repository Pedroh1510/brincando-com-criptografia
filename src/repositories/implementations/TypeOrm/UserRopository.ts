import { Users } from './../../../entities/Users'
import { UsersTypeOrm } from './../../../entities/implementations/TypeOrm/UsersTypeOrm'
import { IUserRepository } from './../../IUserRepository'
import { typeOrmHelper } from './helper/typeOrmHelper'

export class UserRepository implements IUserRepository {
  async save(data: Users): Promise<void> {
    const connectionDb = typeOrmHelper.connection

    const connectionUser = new UsersTypeOrm(data)

    await connectionDb.manager.save(connectionUser)
  }

  async findByName(name: string): Promise<Users> {
    const connectionDb = typeOrmHelper.connection

    const user: Users = await connectionDb
      .getRepository(UsersTypeOrm)
      .findOne(name)

    return user
  }
}
