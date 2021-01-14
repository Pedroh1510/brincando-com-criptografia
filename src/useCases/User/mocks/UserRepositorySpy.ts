import { Users } from '@entities/Users'
import { IUserRepository } from '@repositories/IUserRepository'

export class UserRepositorySpy implements IUserRepository {
  user: Users
  isValidPassword = true
  returnThrow = false
  async save(data: Users): Promise<void> {
    if (this.returnThrow) throw new Error('Test')
    this.user = data
  }

  async findByEmail(email: string): Promise<Users> {
    if (this.returnThrow) throw new Error('Test')
    if (this.isValidPassword) {
      return this.user
    }
    this.user.password = 'erro'
    return this.user
  }
}
