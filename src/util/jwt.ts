import { UnauthorizedError } from './errors'
import jwt from 'jsonwebtoken'
import { CONFIG } from 'src/config/dotenv'

export interface TokenDTO {
  userId: string
}
interface DecodedTokenDTO {
  data: TokenDTO
}

export const generateToken = (data: TokenDTO): string => {
  return jwt.sign({ data }, CONFIG.SECRET, {
    expiresIn: CONFIG.SECRET_TIME
  })
}

export const validadeToken = (
  token: string,
  messageError = 'Erro token invalido'
): TokenDTO => {
  let data: TokenDTO
  jwt.verify(token, CONFIG.SECRET, (err, decoded: DecodedTokenDTO) => {
    if (err) throw new UnauthorizedError(messageError)
    data = decoded.data
  })

  return data
}
