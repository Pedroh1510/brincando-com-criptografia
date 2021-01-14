export interface ICreateUserDTO {
  userName: string
  userDocument: string
  userEmail: string
  userPassword: string
}

export interface ICreateUserDTORequest {
  body: ICreateUserDTO
}
