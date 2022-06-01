import express from 'express'
import morgan from 'morgan'
import "dotenv/config";
import { json, urlencoded } from "body-parser";
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import productsRoutes from './routes/products.routes'
import userRoutes from './routes/user.routes'
import tallerRoutes from './routes/taller.routes'
import classroomRoutes from './routes/classroom.routes'
import homeworksRoutes from './routes/homeworks.routes'
import { credentials } from './middlewares/credentials'
import cloudinary from "cloudinary";
import cors from 'cors'

import {createRoles} from './libs/initialSetup'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
createRoles()

app.use(credentials)
const corsOptions = {
    origin: process.env.URL_FRONT,
    optionsSuccessStatus: 200,
    credentials: true,
  };

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user',userRoutes)
app.use('/api/taller',tallerRoutes)
app.use('/api/products',productsRoutes)
app.use('/api/classroom',classroomRoutes)
app.use('/api/homework',homeworksRoutes)
app.use('/auth/local',authRoutes)

app.get('/', (req, res) => {
    res.json('Rabit API')
})

export default app
 