const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require('./routes/authroutes');


const port = process.env.PORT || 5000;
const app = express();

app.use(express.json()); 

mongoose.connect('mongodb://0.0.0.0:27017/E-commerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

app.use('/api/customer', authRoutes);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
