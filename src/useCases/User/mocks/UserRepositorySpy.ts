import { Users } from '@entities/Users'
import { IUserRepository } from '@repositories/IUserRepository'

export class UserRepositorySpy implements IUserRepository {
  user: Users
  isValidPassword = true
  async save(data: Users): Promise<void> {
    this.user = data
  }

  async findByEmail(email: string): Promise<Users> {
    if (this.isValidPassword) {
      return this.user
    }
    this.user.password = 'erro'
    return this.user
  }
}
