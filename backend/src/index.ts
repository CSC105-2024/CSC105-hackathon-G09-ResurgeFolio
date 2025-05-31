import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv'
import { PrismaClient } from './generated/prisma/index.js'
import { cors } from 'hono/cors'
import mainRouter from './routes/index.js'
dotenv.config();
const app = new Hono();
export const db = new PrismaClient();

app.use('*',
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }))
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route('/',mainRouter)
serve({
  fetch: app.fetch,
  port: 8000,
}, (info) => {
  console.log(`Server ready at http://localhost:${info.port}`)
})