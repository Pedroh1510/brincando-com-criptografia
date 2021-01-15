export interface IRegisterBuyDTORequest {
  body: {
    token: string
    card: string
    value: number
    auth: { userId: string }
  }
}
