import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';
import { ProductRouter } from './app/modules/Product/product.route';
import { OrderRouter } from './app/modules/Order/order.route';

//parsers
app.use(cors());
app.use(express.json());

//product routing
app.use('/api/products', ProductRouter);
app.use('/api/orders',OrderRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is live');
});

export default app;
