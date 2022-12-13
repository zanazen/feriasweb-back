import express from 'express'
import * as dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()
const app = express()
app.use(express.json())
app.get('/'),(request,response) => {
    return response.json("hello Word")
}
app.listen(Number(process.env.PORT), () => console.log('server on port, 8080!'))
