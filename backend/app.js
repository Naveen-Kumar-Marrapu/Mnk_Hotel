import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import vendorRoutes from './routes/vendorRoutes.js';
import bodyParser from 'body-parser';
import firmRoutes from './routes/firmRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();
let PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(()=> app.listen(5000, ()=> console.log(`connected to database and server is running at ${PORT}`))
).catch((e)=> console.log(e));

app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product', productRoutes);


