import { Users } from './../../../entities'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('Users')
export class UsersTypeOrm implements Users {
  constructor(props: Omit<Users, 'id'>) {
    Object.assign(this, props)
  }

  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  document: string

  @Column()
  email: string
}
