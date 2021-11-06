CREATE TABLE categories (
    name TEXT PRIMARY KEY
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    condition TEXT NOT NULL,
    image TEXT,
    quantity INTEGER,
    primary_color TEXT,
    era TEXT,
    height_in_inches INTEGER,
    width_in_inches INTEGER,
    date_added TIMESTAMP DEFAULT NOW(), 
    price DECIMAL NOT NULL,
    category_name TEXT
      REFERENCES categories ON DELETE CASCADE
);

CREATE TABLE products_categories (
  product_id INTEGER
    REFERENCES products NOT NULL ON DELETE CASCADE,
  category_name TEXT
    REFERENCES categories NOT NULL ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_name)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE user_addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
      REFERENCES users ON DELETE CASCADE,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code INTEGER NOT NULL,
    us_state TEXT,
    country TEXT NOT NULL,
    telephone TEXT
);

CREATE TABLE user_payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
      REFERENCES users ON DELETE CASCADE,
    payment_type TEXT NOT NULL,
    provider TEXT NOT NULL,
    account_number INTEGER NOT NULL,
    expire_date TEXT NOT NULL
);
