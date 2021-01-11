import { Users } from '@entities/Users'
import { UsersDocuments } from '@entities/UsersDocuments'
import { IBuyRepository } from '@repositories/IBuyRepository'

export class BuyRepositorySpy implements IBuyRepository {
  user: Users
  document: UsersDocuments
  isValidPassword = true
  async save(document: UsersDocuments): Promise<void> {
    this.document = document
  }

  async findUserById(id: string): Promise<Users> {
    if (this.isValidPassword) {
      return this.user
    }
    this.user.password = 'erro'
    return this.user
  }
}
