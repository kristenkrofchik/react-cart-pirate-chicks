const db = require("../db.js");


async function commonBeforeAll() {
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM products");
  
    await db.query(`
        INSERT INTO products
        (name, description, condition, image, quantity, primary_color, era, height_in_inches, width_in_inches, price, category_name)
        VALUES 
        ('test', 'this is a test','good', null, 1, 'brown', '1950s', null, null, 2021-11-11 03:05:06, 20.00, null)
        ('test2', 'this is a test 2','good', null, 1, 'brown', '1950s', null, 2019-09-10 10:10:10, 30.00, null)
        ('test3', 'this is a test 3','good', null, 1, 'brown', '1950s', null, 2020-10-10 04:05:06, 40.00, null)`);
    };
  
    async function commonBeforeEach() {
        await db.query("BEGIN");
    };
  
    async function commonAfterEach() {
        await db.query("ROLLBACK");
    };
  
    async function commonAfterAll() {
        await db.end();
    };
  
  
  module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
  };