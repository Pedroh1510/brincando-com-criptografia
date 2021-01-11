export interface IRegisterBuyDTORequest {
  token: string
  card: string
  value: number
  auth: { userId: string }
}
