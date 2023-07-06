const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    authors: [String]
    description: String
    bookId: ID!
    image: String
    link: String
    title: String
  }
  type User {
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }
  input saveBook {
    authors: [String]
    description: String
    bookId: ID!
    image: String
    link: String
    title: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: saveBook!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
