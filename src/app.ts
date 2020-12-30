import express from 'express'
import routes from './routes'
import { errors } from 'celebrate'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())

export default app
