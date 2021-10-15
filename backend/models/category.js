'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require("../expressError");

class Category {
    /**Create a category, update db, return new category data. 
     * Throws BadRequestError if category already in db
    */

    static async create({ name }) {
        const duplicateCheck = await db.query(
            `SELECT name
             WHERE name = $1`,
          [name]);
  
        if (duplicateCheck.rows[0])
            throw new BadRequestError(`There is already a category with the name ${name}. Please try again.`);
        
        const result = await db.query(
            `INSERT INTO categories
            (name)
            VALUES ($1)
            RETURNING name`,
            [
                name
            ],
        );
        const category = result.rows[0];

        return category;
    }

    /**Find all categories */
    static async findAll() {
        let query = `SELECT name
                     FROM categories
                     ORDER BY name`;

        const categoriesRes = await db.query(query);
        return categoriesRes.rows;
    }

    /**Given a cateogry name, return data about category.
     * will return products associated with the category too.
     * Throws NotFoundError if not found.
     */

    static async get(name) {
        const categoryRes = await db.query(
            `SELECT name
            FROM categories
            WHERE name = $1`,
            [name]);
        
        const category = categoryRes.rows[0];

        if (!category) throw new NotFoundError(`No category: ${name}`);

        const productsRes = await db.query(
            `SELECT id, name, description, image, era, price
            FROM products
            WHERE category_name = $1
            ORDER BY id`,
            [name],
        );

        category.products = productsRes.rows;

        return category;
    }

    /**Update category data with data.
     * There is only one field (name).
     * Throws NotFoundError if not found
     */
    static async update(id) {
        const { name } = req.body;

        const result = await db.query(
                `UPDATE categories
                SET name = $1
                WHERE id = ${id}
                RETUNING id, name`,
                [name, id]);
        //not sure of this **********
        const category = result.rows[0];

        if (!category) throw new NotFoundError(`There is not category with that name. Please try again.`);

        return category;
    }

}


module.exports = Category;