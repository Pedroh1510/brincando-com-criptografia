export interface ILoginUserRequestDTO {
  body: {
    email: string
    password: string
  }
}

export interface ILoginUserResponseDTO {
  token: string
}
