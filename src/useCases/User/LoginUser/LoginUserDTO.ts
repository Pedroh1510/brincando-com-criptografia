export interface ILoginUserRequestDTO {
  email: string
  password: string
}

export interface ILoginUserResponseDTO {
  token: string
}
