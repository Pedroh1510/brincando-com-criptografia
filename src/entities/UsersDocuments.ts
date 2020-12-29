import { uuid } from 'uuidv4'

export class UsersDocuments {
  public readonly id: string
  public userDocument: string
  public creditCardToken: string
  public value: number

  constructor(props: Omit<UsersDocuments, 'id'>) {
    Object.assign(this, props)
    if (!this.id) {
      this.id = uuid()
    }
  }
}
