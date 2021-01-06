import { Users } from '@entities/Users'
import { IUserRepository } from '@repositories/IUserRepository'

export class UserRepositorySpy implements IUserRepository {
  user: Users
  async save(data: Users): Promise<void> {
    this.user = data
  }

  async findByEmail(email: string): Promise<Users> {
    return this.user
  }
}
