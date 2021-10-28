const { BadRequestError } = require('../expressError');

/**Helper function for making selective update queries.
 * used to make SET clause of SQL UPDATE statement
 * used for update user profile.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
    const keys = Object.keys(dataToUpdate);
    if(keys.length === 0) throw new BadRequestError('No data was received. Please try again.');

    const cols = keys.map((colName, idx) =>
    `'${jsToSql[colName] || colName}'=$${idx + 1}`,
    );

    return {
        setCols: cols.join(', '),
        values: Object.values(dataToUpdate),
    };
}

module.exports = { sqlForPartialUpdate };