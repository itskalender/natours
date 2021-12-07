const mongoose          = require('mongoose');
const db                = process.env.DATABASE_CONNECTION;
const connectionString  = db.replace('<PASSWORD>', process.env.DATABASE_PASSWORD); 

async function connectDB() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`Database connection       : connected 🖐`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;