import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Router from './routes/routes.js'
// getting the local authentication type
// init express
const app = express()

// use express json
app.use(express.json())

app.use(cookieParser())
// use cors
app.use(cors({
  credentials: true,
  origin: ['http://localhost:8080']
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// use router
app.use(Router)
app.listen(5000, () => console.log('Server running at http://localhost:5000'))
