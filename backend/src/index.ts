import express, { json, type Response } from 'express';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(json())

app.get('/', (_, res: Response) => {
	res.status(200).json("Hello from the Budget Trucker API")
})

app.get('/api', (_, res) => {
	res.send({ message: 'Welcome to backend!' });
});

app.use('/api/auth', authRoutes)

const port = process.env["PORT"] || 4000;
const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);

