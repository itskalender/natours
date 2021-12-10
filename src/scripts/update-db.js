const { setConfig } = require('../config');
const fs            = require('fs');
const mongoose      = require('mongoose');
const { 
  Tour,
  User,
  Review
}                   = require('../models');

setConfig();

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

const args = process.argv.slice(2);

const tours   = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`, 'utf8'));
const users   = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/reviews.json`, 'utf8'));

async function deleteAllTours() {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('All development data successfully deleted ✅');
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
}

async function importAllTours() {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('All development data successfully inserted ✅');
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
}

if (args[0] === '--delete') {
  deleteAllTours();
} else if (args[0] === '--insert') {
  importAllTours();
}