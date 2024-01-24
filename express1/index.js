const express = require("express")
const connectDataBase = require('./src/database/db')
const dotenv = require("dotenv")

const userRoute = require('./src/routes/user.route') 
const authRoute = require('./src/routes/auth.route')
const postRoute = require('./src/routes/post.route')
const modRoute = require('./src/routes/mod.route')

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

connectDataBase()
app.use(express.json())
app.use("/user",userRoute)
app.use("/auth",authRoute)
app.use("/post",postRoute)
app.use("/mod",modRoute)
app.listen(port,()=> console.log(`Servidor rodando na porta ${port}`))