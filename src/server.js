process.on('uncaughtException', function exceptionHandler(err) {
  console.log(`${err.name}: ${err.message}`);

  process.exit(1);
});

const { setEnv }    = require('./config');
setEnv();

const { connectDB } = require('./loaders');
connectDB();

const app     = require('./app');
const server  = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port  : ${process.env.PORT} 🖐\nEnviroment                : ${process.env.NODE_ENV}`);
});

process.on('unhandledRejection', function rejectionHandler(err) {
  console.log(`${err.name}: ${err.message}`);

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