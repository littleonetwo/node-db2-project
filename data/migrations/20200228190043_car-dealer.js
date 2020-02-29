
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();

    tbl.text('make', 40).notNullable();

    tbl.text('model', 40).notNullable();

    tbl.text('vin', 50).notNullable().unique();

    tbl.decimal('mileage').notNullable();

    tbl.text('titleStat', 10);

    tbl.text('transmission', 8);
  });

};

exports.down = function(knex) {

  return knex.schema.dropTableIfExists('cars');

};
