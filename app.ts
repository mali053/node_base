process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import emailRouter from './Routes/checkEmail'; // Assuming your router file is named emailRouter.ts

const app: Express = express();
const port = 8000;

app.use(bodyParser.json());

// Define your main route handler
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/email', emailRouter); 

app.listen(port, () => {
  console.log(`Server is on fire at http://localhost:${port}`);
});
