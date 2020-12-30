import { hashString } from '@util/cryptography'
import { uuid } from 'uuidv4'

export class Users {
  public readonly id: string
  public name: string
  public email: string
  public document: string
  public token?: string
  public tokenExpiresOn?: Date
  public password: string

  constructor(props: Omit<Users, 'id'>) {
    Object.assign(this, props)
    if (!this.id) {
      this.id = uuid()
    }
    this.document = hashString(this.document)
    this.password = hashString(this.password)
  }
}
