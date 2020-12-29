import { hash, compare, hashSync } from 'bcrypt'

const secretNumber = parseInt(process.env.SECRET_NUMBER)

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
