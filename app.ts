import 'reflect-metadata'
export const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT')
  res.header('Allow', 'GET, POST, OPTIONS, PUT')
  next()
})

app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.production' })
dotenv.config({ path: '.env.development' })
dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env.test' })

app.use(cookieParser())

app.use(cors({ credentials: false, origin: '*' }))
app.use('/', require('./routes/router'))
app.set('port', process.env.PORT || 3003)

app.listen(app.get('port'), () => {
  console.log('\x1b[32m', `Server is running on port ${app.get('port')}`)
})
