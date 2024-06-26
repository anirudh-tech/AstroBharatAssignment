import express, { Application, NextFunction, Request, Response } from 'express'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { astrologyRoutes } from './routes/astrologyRoutes';
import cors from "cors"
dotenv.config();


const app: Application = express();

const PORT: number = Number(process.env.PORT) || 3000
const corsOptions = {
  origin:'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use('/api',astrologyRoutes())

app.use((
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const errorResponse = {
    errors: [{ message: err?.message || 'Something went wrong' }],
  };
  return res.status(500).json(errorResponse);
})


app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`)
})

export default app