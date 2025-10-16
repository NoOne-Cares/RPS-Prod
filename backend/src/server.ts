import express, { urlencoded } from 'express'
import { config } from 'dotenv';
import cookirParser from 'cookie-parser'
import cors from 'cors'
import http from 'http';
import { startSocketServer } from './sockets/server';

config()

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: process.env.FRONTEDN_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(cookirParser())
app.use(express.json({ limit: "15kb" }))
app.use(urlencoded({ extended: true, limit: "15kb" }))

import AuthRouter from './routes/AuthRoute'
import GameRouter from './routes/Gmae.router';

app.use('/api/auth', AuthRouter)
app.use('/api/games', GameRouter)
startSocketServer(server);
export default server