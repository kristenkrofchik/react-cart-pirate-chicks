'use strict'

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Product {
    /**Create a product (from data), update db, return new product data.
     * Throws BadRequestError is product already in db
     */
    static async create({ name, description, condition, image, quantity, primaryColor, era, heightInInches, widthInInches, dateAdded, price, categoryName }) {
        const duplicateCheck = await db.query(
            `SELECT handle
             FROM companies
             WHERE handle = $1`,
            [handle]);
        
        if(duplicateCheck.rows[0])
            throw new BadRequestError(`This product already exists in the database: ${product_name}`);
        
        const result = await db.query(
            `INSERT INTO products
            (name, description, condition, image, quantity, primary_color, era, height_in_inches, width_in_inches, date_added, price, category_name)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING name, description, condition, image, quantity, primary_color AS 'primaryColor', era, height_in_inches AS 'heightInInches', width_in_inches AS 'widthInInches', date_added AS 'dateAdded', price, category_name AS 'categoryName'`,
            [
               name,
               description,
               condition, 
               image,
               quantity,
               primaryColor,
               era,
               heightInInches,
               widthInInches,
               dateAdded,
               price,
               categoryName 
            ],
        );
        const product = result.rows[0];

        return product;
    }

    /**Find all products (optional filter on searchFilters).
     * 
     * searchFilters (optional):

     * -name (will find case-insensitive, partial match)
     */
    static async findAll(searchFilters = {}) {
        let query = `SELECT name,
                            description,
                            condition,
                            image,
                            quantity,
                            primary_color AS "primaryColor",
                            era,
                            height_in_inches AS "heightInInches",
                            width_in_inches AS "widthInInches",
                            date_added AS "dateAdded",
                            price,
                            category_name AS "categoryName"
                     FROM products`;
        let whereExpressions = [];
        let queryValues = [];

        const { byCategory, byName } = searchFilters;

        if (byName) {
            queryValues.push(`%${byName}%`);
            whereExpressions.push(`name ILIKE $${queryValues.length}`);
        }

        if(byCategory) {
            queryValues.push(`%${byCategory}%`);
            whereExpressions.push(`category ILIKE $${queryValues.length}`);
        }

        if(whereExpressions.length > 0) {
            query += ' WHERE ' + whereExpressions.join(' AND ');
        }

        //finalize and return results
        query += ' ORDER BY name';
        const productsRes = await db.query(query, queryValues);
        return productsRes.rows;
    }

    /**Given a product id, return data about product
     * Throws NotFoundError if not found
     */

    static async get(id) {
        const productRes = await db.query(
            `SELECT name,
                    description,
                    condition,
                    image,
                    quantity,
                    primary_color AS "primaryColor",
                    era,
                    height_in_inches AS "heightInInches",
                    width_in_inches AS "widthInInches",
                    date_added AS "dateAdded",
                    price,
                    category_name AS "categoryName"
            FROM products
            WHERE id = $1`,
            [id]);
        
        const product = productRes.rows[0];

        if (!product) throw new NotFoundError(`No product with id ${id}. Please try again.`);

        return product;
    }

    /**Update product data with data.
     * A 'partial update' - will only change field provided.
     * Throws NotFoundErrod if not found.
     */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                primaryColor: "primary_color",
                heightInInches: "height_in_inches",
                widthInInches: "width_in_inches",
                dateAdded: "date_added",
                categoryName: "category_name"
            });
        const handleVarIdx = '$' + (values.length + 1);

        const querySql = `UPDATE products
                          SET ${setCols}
                          WHERE handle = ${handleVarIdx}
                          RETURNING name,
                                    description,
                                    condition, 
                                    image,
                                    quantity,
                                    primary_color AS "primaryColor",
                                    era,
                                    height_in_inches AS "heightInInches",
                                    width_in_inches AS "widthInInches",
                                    date_added AS "dateAdded",
                                    price,
                                    category_name AS "categoryName"`;
        const result = await db.query(querySql, [...values, id]);
        const product = result.rows[0];

        if (!product) throw new NotFoundError(`No product found with the id ${id}`);

        return product;
    }

    /**Delete given product from db; returns undefined.
     * Throws NotFoundError if product not found.
     */

    static async remove(id) {
        const result = await db.query(
            `DELETE
            FROM products
            WHERE id = $1
            RETURNING handle`,
            [id]);
        const product = result.rows[0];

        if (!product) throw new NotFoundError(`No product found with the id ${id}`);
        }

    }

module.exports = Product;