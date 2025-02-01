import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';
import { ProductRouter } from './app/modules/Product/product.route';

//parsers
app.use(cors());
app.use(express.json());

//product routing
app.use('/api/products',ProductRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is live');
});

export default app;
