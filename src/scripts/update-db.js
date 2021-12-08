const { setEnv }  = require('../config');
const fs          = require('fs');
const mongoose    = require('mongoose');
const { Tour }    = require('../models');

/* Set Environment */
setEnv();

/* DB Connection */
const db                = process.env.DATABASE_CONNECTION;
const connectionString  = db.replace('<PASSWORD>', process.env.DATABASE_PASSWORD); 

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
    console.log(`Database connection: connected 🖐`);
  })
  .catch((err) => {
    console.error(`Database connection error: ${err}`);
  })

/* Args */
const args = process.argv.slice(2);

/* Read Tours */
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`, 'utf8'));

/* Functions  */
async function deleteAllTours() {
  try {
    await Tour.deleteMany();
    console.log('All tours successfully deleted ✅');
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
}

async function importAllTours() {
  try {
    await Tour.create(tours);
    console.log('All tours successfully inserted ✅');
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
}

/* Decision */
if (args[0] === '--delete') {
  deleteAllTours();
} else if (args[0] === '--insert') {
  importAllTours();
}