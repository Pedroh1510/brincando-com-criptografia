import { Users } from '@entities/Users'
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

  @Column({ nullable: true })
  token?: string

  @Column({ nullable: true })
  tokenExpiresOn?: Date

  @Column()
  password: string
}
