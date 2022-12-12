import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())
app.get('/'),(request,response) => {
    return response.json("hello Word")
}
app.listen(Number(process.env.PORT), () => console.log('server on port, 8080!'))
