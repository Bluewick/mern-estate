import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('DB Connected');
}).catch((err) => {
    console.log(err);  
});

const app = express();

app.listen(3000, () => {
  console.log('Server is running on : http://localhost:3000');
});

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

app.use('/api', userRoutes);