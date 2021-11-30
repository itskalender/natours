require('dotenv').config();
require('./mongoose-connection');

const app = require('./app');

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server listening on port  : ${port} 🖐\nEnviroment                : ${process.env.NODE_ENV}`);
});

process.on('unhandledRejection', function rejectionHandler() {
  server.close(() => {
    let time = 3;

    const id = setInterval(function timeChecker() {
      console.log(`Server is ${time === 0 ? 'down...' : `shutting down in ${time} seconds...`}`);
      
      if (time === 0) { 
        clearInterval(id);
        process.exit(1);
      };

      time--;
    }, 1000);
  });
});