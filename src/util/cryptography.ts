import { compare, hashSync } from 'bcrypt'
import { CONFIG } from 'src/config/dotenv'

const secretNumber = parseInt(CONFIG.SECRET_NUMBER)

export function hashString(data: string): string {
  const hashedData = hashSync(data, secretNumber)
  return hashedData
}

export async function validateHashedString(
  data: string,
  hashedData: string
): Promise<boolean> {
  const isValid = await compare(data, hashedData)

  return isValid
}
