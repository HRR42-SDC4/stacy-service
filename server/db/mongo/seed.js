const mongoose = require('mongoose');
const db = require('./index.js');
const faker = require('faker');
const Restaurants = require('./Restaurant.js');

const populate = () => {
  const data = [];

  for (let i = 1; i <= 100; i++) {
    const name = faker.random.words();
    const restaurant = {
      id: i,
      name,
      imageUrls: [],
    };

    const numberPhotos = Math.floor(Math.random() * 12 + 9);

    for (let j = numberPhotos; j > 0; j--) {
      const num = Math.floor((Math.random() * 822 + 1));
      const url = `https://zagat.s3.amazonaws.com/photo${num}.jpg`;
      restaurant.imageUrls.push(url);
    }
    data.push(restaurant);
  }

  Restaurants.insertMany(data)
    .then(() => console.log('Database populated'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
};

populate();
