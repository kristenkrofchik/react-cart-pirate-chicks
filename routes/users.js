//Routes for user data
'use strict';

const jsonschema = require("jsonschema");
const userUpdateSchema = require("../schemas/userUpdate.json");

const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");

const express = require("express");
const router = express.Router();

/** GET /[username] => { user }
 * Returns user info (used for user profile)
 * Authorization required: same user-as-:username or admin
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[username] { user } => { user }
 * Data can include:
 *   { firstName, lastName, password, email }
 * Returns { username, firstName, lastName, email }
 * Authorization required: same-user-as-:username or admin
 **/

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;