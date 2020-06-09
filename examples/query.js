'use strict';

const { graphql, buildSchema } = require('graphql');

// Definiendo el esquema
const schema = buildSchema(`
  type Query {
    hello: String
    saludo: String
  }
`);

// Configurar los resolves
const resolves = {
  hello: () => {
    return 'Hola mundo'
  },
  saludo: () => {
    return 'Este es un saludo'
  }
};

// Ejecutar el query hello
graphql(schema, '{ hello }', resolves).then((data) => {
  console.log(data);
});
graphql(schema, '{ saludo }', resolves).then((data) => {
  console.log(data);
});