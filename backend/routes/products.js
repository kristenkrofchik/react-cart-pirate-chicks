'use strict';

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Product = require("../models/product");

const productNewSchema = require("../schemas/productNew.json");
const productUpdateSchema = require("../schemas/productUpdate.json");
const productSearchSchema = require("../schemas/productSearch.json");

const router = new express.Router();

/** POST / 
 * {product} => {product} 
 * Authorization required: admin
*/

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, productNewSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const product = await Product.create(req.body);
      return res.status(201).json({ product });
    } catch (err) {
      return next(err);
    }
  });

  /**GET /
   * all products
   * can filter on category, name (case-insensitive, partial match)
   * authorization required- none
   */

router.get("/", async function (req, res, next) {
    const q = req.query;
  
    try {
      const validator = jsonschema.validate(q, productSearchSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const products = await Product.findAll(q);
      return res.json({ products });
    } catch (err) {
      return next(err);
    }
  });

/**GET /[id] => { product }
 * Authorization required- none
 */

router.get('/:id', async function (req, res, next) {
    try {
        const product = await Product.get(req.params.id);
        return res.json({ product });
    } catch (err) {
        return next(err);
    }
})

/**PATCH /[id] {data, data, ...} => {product} 
 * patches product data.
 * authorization required: admin.
*/

router.patch("/:id", ensureAdmin, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, productUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const product = await Product.update(req.params.handle, req.body);
      return res.json({ product });
    } catch (err) {
      return next(err);
    }
  });

  /** DELETE /[id]  =>  { deleted: id }
 * Authorization: admin
 */

router.delete("/:id", ensureAdmin, async function (req, res, next) {
    try {
      await Company.remove(req.params.id);
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  });
  
  
  module.exports = router;