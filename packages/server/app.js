import 'dotenv/config';
import colors from 'colors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import keys from './configs/keys';
import apiRouter from './routes';
import cookieParser from 'cookie-parser';

const DB_URL = keys.db.url;
const API_URL = keys.api.url;
const PORT = keys.api.port;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('[Database] Connection Established.'))
  .catch((err) =>
    console.log(
      '[Database] An error occurred connecting to the db: ',
      err
    )
  );

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(API_URL, apiRouter);

app.listen(PORT, () =>
  console.log(`[Server] Listening on port ${PORT}`.bgMagenta)
);
