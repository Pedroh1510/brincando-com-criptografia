import { UsersDocuments } from '@entities/UsersDocuments'
import { Users } from '@entities/Users'

export interface IBuyRepository {
  findUserById(id: string): Promise<Users>
  save(document: UsersDocuments): Promise<void>
}
