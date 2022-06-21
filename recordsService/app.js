import express from 'express';
import cookieParser from 'cookie-parser';
import router from './router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser('secret key'));
app.use(express.static('uploads'));
app.use('/', router);

export default app;