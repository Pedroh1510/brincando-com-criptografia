import { hashString } from '@util/cryptography'
import { v4 as uuid } from 'uuid'

export class UsersDocuments {
  public readonly id: string
  public userId: string
  public creditCardToken: string
  public value: number

  constructor(props: Omit<UsersDocuments, 'id'>) {
    Object.assign(this, props)
    // if (!this.id) {
    // }
    this.id = uuid()
    this.creditCardToken = hashString(this.creditCardToken)
  }
}
