import { Users } from '@entities/Users'

export interface IUserRepository {
  save(data: Users): Promise<void>
  findByEmail(email: string): Promise<Users>
}
