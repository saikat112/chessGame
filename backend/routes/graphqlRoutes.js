const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');

const router = express.Router();

const startApolloServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app: router });
};

startApolloServer();

module.exports = router;
