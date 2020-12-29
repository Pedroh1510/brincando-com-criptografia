import { Users } from './../entities/Users'

export interface IUserRepository {
  save(data: Users): Promise<void>
  findByName(name: string): Promise<Users>
}
