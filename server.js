require('dotenv').config();
require('./mongoose-connection');

const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port  : ${port} 🖐\nEnviroment                : ${process.env.NODE_ENV}`);
});