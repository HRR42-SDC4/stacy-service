const mongoose = require('mongoose');
const Restaurant = require('./Restaurant.js');

mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

mongoose.connect('mongodb://localhost/zagat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));


const get = (id) => Restaurant.findOne({ id });

const create = (newRestaurant) => Restaurant.create(newRestaurant);

const update = (id, updatedData) => Restaurant.findOneAndUpdate({ id }, updatedData, { new: true });

const remove = (id) => Restaurant.findOneAndDelete({ id });


module.exports = {
  db, get, create, update, remove,
};

// 'mongodb://mongo:27017/zagat' ||
