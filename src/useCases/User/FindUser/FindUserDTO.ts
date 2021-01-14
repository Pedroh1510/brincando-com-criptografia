export interface IFindUserRequestDTO {
  body: {
    userEmail: string
  }
}

export interface IFindUserResponseDTO {
  userName: string
  userEmail: string
  userId: string
}
