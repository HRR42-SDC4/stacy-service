const cassanKnex = require('cassanknex')({
  connection: {
    contactPoints: ['localhost'],
    keyspace: 'sdc',
  },
  exec: {
    prepare: false
  }
});


function ready() {
  return new Promise((resolve, reject) => {
    cassanKnex.on('ready', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}


module.exports = {
  db: cassanKnex,
  get, create, update, remove,
};
