\c sdc

CREATE TABLE restaurants (
  id SERIAL,
  name TEXT,
  images TEXT[],
  PRIMARY KEY (id)
);