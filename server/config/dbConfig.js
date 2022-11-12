const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGO_URL
);
const connection = mongoose.connection;

connection.on('connected',()=>console.log('Mongoose connection  established'));
connection.on('error',()=>console.log('Mongoose connection error'));


module.exports = mongoose;