const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Move {
    from: String!
    to: String!
    piece: String!
    timestamp: String!
  }

  type Game {
    id: ID!
    players: [String!]!
    moves: [Move!]!
    status: String!
    result: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    games: [Game!]!
    game(id: ID!): Game
  }

  type Mutation {
    createGame: Game!
    joinGame(id: ID, player: String!): Game!
    makeMove(id: ID!, from: String!, to: String!, piece: String!): Game!
  }
`;

module.exports = typeDefs;
