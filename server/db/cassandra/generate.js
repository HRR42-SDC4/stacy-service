const fs = require('fs');
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/* Override seed date so Faker outputs same random number */
/* faker.seed(0); */

const writer = createCsvWriter({
  path: 'data.csv',
  header: [
    {
      id: 'id',
      title: 'id',
    },
    {
      id: 'name',
      title: 'name',
    },
    {
      id: 'images',
      title: 'images',
    }
  ],
  fieldDelimiter: ';',
});

function* restaurantGenerator() {
  for (let id = 1;; ++id) {
    const images = [];
    const numImages = faker.random.number({ min: 3, max: 9 });
    for (let i = 0; i < numImages; ++i) {
      const photoIndex = faker.random.number({ min: 1, max: 1000 });
      images.push(`https://hrr42-sdc.s3.amazonaws.com/photo${photoIndex}.jpg`);
    }
    yield {
      id,
      name: faker.company.companyName(),
      images: '[' + images.join(',') + ']',
    };
  }
}

function getN(iterator, n) {
  return Array.from({ length: n }, ((i) => () => i.next().value)(iterator));
}

async function writeRestaurants(num, numPerBatch = 1000) {
  const restaurants = restaurantGenerator();
  for (let i = 0; i < num; i += numPerBatch) {
    await writer.writeRecords(getN(restaurants, numPerBatch));
  }
}

async function main() {
  console.time('Data Generation Time');
  await writeRestaurants(1e7, 100000);
  // await writeRestaurants(1000, 1000);
  console.timeEnd('Data Generation Time');
}

main();
