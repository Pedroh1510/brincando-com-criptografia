import express from 'express'
import routes from './routes'
import { errors } from 'celebrate'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'

const app = express()

app.use(compression())
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)
app.use(errors())

export default app
