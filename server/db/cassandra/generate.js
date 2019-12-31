const fs = require('fs');
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
  ]
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
      images: JSON.stringify(images),
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
  console.time('data generation');
  await writeRestaurants(1e7, 100000);
  console.timeEnd('data generation');
}

main();