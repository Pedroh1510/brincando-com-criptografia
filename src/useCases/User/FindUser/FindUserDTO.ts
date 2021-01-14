export interface IFindUserRequestDTO {
  query: {
    userEmail: string
  }
}

export interface IFindUserResponseDTO {
  userName: string
  userEmail: string
  userId: string
}
