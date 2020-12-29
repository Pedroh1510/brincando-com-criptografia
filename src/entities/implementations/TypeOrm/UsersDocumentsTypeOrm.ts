import { UsersDocuments } from './../../../entities'
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
  userDocument: string

  @Column()
  value: number
}
