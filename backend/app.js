require('dotenv').config()
require('express-async-errors')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

const express = require('express')
const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
const errorHandler = require('./error/errorHandler')
const authenticator = require('./middleware/authentication')
const authRouter = require('./routes/auth')
app.use('/api/v1/auth/',authRouter)
app.use(errorHandler)

const connectDB = require('./db/connect')
const start = async()=>{
    const port = 3000 || process.env.PORT
    await connectDB(process.env.MONGO_URI);
    console.log('connected to db')
    app.listen(port,()=>console.log('Server listening on port '+port))
}
start()

