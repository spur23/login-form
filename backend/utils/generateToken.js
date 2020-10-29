import jwt from 'jsonwebtoken'

// generates json web token that lasts 30 days
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })

export default generateToken
