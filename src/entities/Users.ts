import { uuid } from 'uuidv4'

export class Users {
  public readonly id: string
  public name: string
  public userDocument: string

  constructor(props: Omit<Users, 'id'>) {
    Object.assign(this, props)
    if (!this.id) {
      this.id = uuid()
    }
  }
}
