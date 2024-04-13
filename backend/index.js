import express from 'express'
import homeRouter from './routers/home/index.js'
import uploadRouter from './routers/upload/index.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();

process.loadEnvFile(); // haha new way to load env file no need to install dotenv shit

const PORT = process.env.PORT;


app.use(cors({
    origin: ['http://localhost:5173', 'https://file-converter-kohl.vercel.app','https://file-converter-rks.vercel.app'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());


app.use('/upload', uploadRouter)
app.use('/', homeRouter);


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));



