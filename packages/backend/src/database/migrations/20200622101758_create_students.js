exports.up = function(knex) {
    // o metodo up sempre vai ser para criar uma nova tabela
  // Para criar uma nova tabela
  return knex.schema.createTable('students', function(table) {
    table.increments('id').primary();//transforma essa coluna em uma primary Key com auto incremento
    table.string('registration').unique().notNullable();
    table.string('name').notNullable();//o notNullablee faz com que esse campo não seja nulo
    table.string('shift').notNullable();
    table.string('course').notNullable();
    table.string('description');

    table.string('user_email').notNullable();

    table.foreign('user_email').references('email').inTable('users');//criando uma chave estrangeira

  });
};

exports.down = function(knex) {
  //o método down é para se acontecer algum problema temos o que saber o que desfazer
  return knex.schema.dropTable('students');//deletando a tabela caso algo der errado
};