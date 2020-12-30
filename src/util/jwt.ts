import jwt from 'jsonwebtoken'

export const generateToken = (data: string): string => {
  return jwt.sign({ [data]: data }, process.env.SECRET)
}
