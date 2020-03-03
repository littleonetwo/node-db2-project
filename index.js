const server = require('./server.js');

const PORT = process.env.PORT || 4000;

const carsRoutes = require('./routers/carsRoutes.js');

server.use('/api/cars', carsRoutes);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
