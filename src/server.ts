import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import session from 'express-session';
import path from 'path';
import { middlewareGlobal } from './middlewares/middlewarGlobal';
import apiRoutes from './router';

const server = express();

server.use(cors());

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.use(express.static(path.join(__dirname, '..', 'public')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const sessionOptions = session({
	secret: process.env.SESSION_SECRET as string,
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 24 * 60 * 60 * 1000 * 1, // dd/hh/mm = 1 day
		httpOnly: true,
	},

});

server.use(sessionOptions);

server.use(middlewareGlobal);
server.use(apiRoutes);

server.use((req: Request, res: Response) => {
	res.status(404).json({ error: 'Endpoint não encontrado.' });
});

server.listen(process.env.PORT, () => {
	console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});