import { UsersDocuments } from '@entities/UsersDocuments'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('UsersDocuments')
export class UsersDocumentsTypeOrm implements UsersDocuments {
  constructor(props: Omit<UsersDocuments, 'id'>) {
    Object.assign(this, props)
  }

  @PrimaryColumn('uuid')
  id: string

  @Column()
  creditCardToken: string

  @Column()
  value: number

  @Column()
  userId: string
}
