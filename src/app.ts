import express, { Request, Response } from 'express'
const app = express()
import cors from 'cors'

//parsers
app.use(cors())
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
  res.send('Server is live')
})

export default app