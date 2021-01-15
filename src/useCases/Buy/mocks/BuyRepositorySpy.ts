import { Users } from '@entities/Users'
import { UsersDocuments } from '@entities/UsersDocuments'
import { IBuyRepository } from '@repositories/IBuyRepository'

export class BuyRepositorySpy implements IBuyRepository {
  user: Users
  document: UsersDocuments
  isValidPassword = true
  returnThrow = false
  async save(document: UsersDocuments): Promise<void> {
    if (this.returnThrow) throw new Error('Test')
    this.document = document
  }

  async findUserById(id: string): Promise<Users> {
    if (this.returnThrow) throw new Error('Test')
    if (this.isValidPassword) {
      return this.user
    }
    this.user.password = 'erro'
    return this.user
  }
}
