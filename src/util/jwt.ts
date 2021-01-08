import jwt from 'jsonwebtoken'

export interface TokenDTO {
  userId: string
}
interface DecodedTokenDTO {
  data: TokenDTO
}

export const generateToken = (data: TokenDTO): string => {
  return jwt.sign({ data }, process.env.SECRET, {
    expiresIn: process.env.SECRET_TIME
  })
}

export const validadeToken = (
  token: string,
  messageError = 'Erro token invalido'
): TokenDTO => {
  let data: TokenDTO
  jwt.verify(token, process.env.SECRET, (err, decoded: DecodedTokenDTO) => {
    if (err) throw new Error(messageError)
    data = decoded.data
  })

  return data
}
