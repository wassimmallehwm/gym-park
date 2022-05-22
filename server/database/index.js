const mongoose = require('mongoose');
const dbSeeder = require('./databaseSeeder');

const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const connection = mongoose.connection;
  connection.once('open', async () => {
    console.info('Connected to DataBase');
    await dbSeeder();
  })
}

module.exports = dbConnect;