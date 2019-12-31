USE sdc;

CREATE TABLE restaurants (
  id int PRIMARY KEY,
  name text,
  images list<text>
);