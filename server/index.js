const express = require('express');
require('dotenv').config();
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db/index.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('public'));

/* GET - Legacy Implementation Fixed */
app.get('/api/restaurants/:restaurantId', (req, res) => {
  const id = req.params.restaurantId;
  db.get(id)
    .then(entry => {
      if (entry) {
        res.send(entry);
      } else {
        res.status(404).send({ error: 'Entry does not exist' });
      }})
    .catch(err => {
      console.log('Error: ', err);
      res.status(404).end();
    });
});

app.post('/api/restaurants', (req, res) => {
  db.create(req.body)
    .then(createdRestaurant => res.status(201).send(createdRestaurant))
    .catch(err => {
      console.log('Error: ', err);
      res.status(404).send(err);
    })
});

app.put('/api/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  db.update(restaurantId, req.body)
    // Better status code for PUT 200?
    .then(updatedRestaurant => res.status(200).send(updatedRestaurant))
    .catch(err => {
      console.log('Error: ', err);
      res.status(400).send(err);
    })
})

app.delete('/api/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  db.remove(restaurantId)
    .then(deletedRestaurant => {
      if (deletedRestaurant) {
        res.status(200).send({ success: 'Successfully deleted!', 'Deleted Restaurant': deletedRestaurant})
      } else {
        res.status(404).send({ error: 'Entry does not exist'});
      }})
    .catch(err => {
      console.log('Error: ', err);
      res.status(400).send(err);
    })
})




const port = process.env.PORT || 3001;

app.listen(port, console.log(`Server running on port: ${port}`));
