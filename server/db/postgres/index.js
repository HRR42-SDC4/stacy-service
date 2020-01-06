const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: 'postgres://Stacy@localhost/sdc',
  searchPath: ['knex', 'public'],
});

const get = async (id) => {
  const rows = await db('restaurants').where({id});
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

const create = async (newRestaurant) => {
  if (newRestaurant.images) {
    newRestaurant.images = JSON.parse(newRestaurant.images);
  }
  const rows = await db('restaurants').insert(newRestaurant).returning('*');
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

const update = async (id, updatedData) => {
  if (updatedData.id !== undefined) {
    throw new Error('Malformed request');
  }
  if (updatedData.images) {
    updatedData.images = JSON.parse(updatedData.images);
  }
  const rows = await db('restaurants')
    .where({id})
    .update(updatedData)
    .returning('*');

  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

const remove = async (id) => {
  const rows = await db('restaurants')
    .where({id})
    .del()
    .returning('*');
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};


module.exports = {
  db, get, create, update, remove,
};
