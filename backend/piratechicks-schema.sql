CREATE TABLE categories (
    name TEXT PRIMARY KEY
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    condition TEXT NOT NULL,
    image TEXT,
    quantity INTEGER NOT NULL,
    primary_color TEXT,
    era TEXT,
    height_in_inches INTEGER,
    width_in_inches INTEGER,
    date_added TIMESTAMP NOT NULL DEFAULT NOW(), 
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

CREATE TABLE shopping_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
      REFERENCES users ON DELETE CASCADE,
    total INTEGER
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL
      REFERENCES shopping_sessions ON DELETE CASCADE,
    product_id INTEGER NOT NULL
      REFERENCES products ON DELETE CASCADE,
    quantity INTEGER NOT NULL
);

CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
      REFERENCES users ON DELETE CASCADE,
    total INTEGER NOT NULL,
    amount DECIMAL NOT NULL,
    provider TEXT NOT NULL,
    status TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_details_id INTEGER NOT NULL
      REFERENCES order_details ON DELETE CASCADE,
    product_id INTEGER NOT NULL
      REFERENCES products ON DELETE CASCADE,
    quantity INTEGER NOT NULL
);