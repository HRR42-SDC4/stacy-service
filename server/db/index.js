const mongoose = require('mongoose');
const Restaurant = require('./Restaurant.js');

mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

mongoose.connect('mongodb://localhost/zagat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));


const get = (id) => {
  return Restaurant.findOne({ id });
};

const create = (newRestaurant) => {
  return Restaurant.create(newRestaurant);
};

const update = (id, updatedData) => {
  return Restaurant.findOneAndUpdate({ id }, updatedData, { new: true });
};

const remove = (id) => {
  return Restaurant.findOneAndDelete( { id });
}



module.exports = { db, get, create, update, remove };

//'mongodb://mongo:27017/zagat' ||
