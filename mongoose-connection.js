const mongoose = require('mongoose');

const db                = process.env.DATABASE_CONNECTION;
const connectionString  = db.replace('<PASSWORD>', process.env.DATABASE_PASSWORD); 

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
    console.log(`Database connection       : connected 🖐`)  
  });