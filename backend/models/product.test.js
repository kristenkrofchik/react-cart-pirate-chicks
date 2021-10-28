"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Product = require("./product.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("create", function () {
    const now = (new Date()).toISOString();

    const newProduct = {
      name: "New Old Item",
      description: "This is a test for a new item.",
      condition: "good",
      quantity: 1,
      dateAdded: now,
      price: "30.00",
      categoryName: null,
      era: "1920's",
      heightInInches: 6,
      widthInInches: 5,
      image: null,
      primaryColor: "blue"
    };
  
    test("works", async function () {
      let product = await Product.create(newProduct);
      expect(product).toEqual(newProduct);
    });
});

