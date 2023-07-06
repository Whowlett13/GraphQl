const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    currentUser: async (parent, args, context) => {
      return User.findOne({ _id: context.user._id });
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          {
            _id: context.user._id,
          },
          {
            $push: { savedBooks: input },
          },
          {
            new: true,
          }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Please Login!");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          {
            _id: context.user._id,
          },
          {
            $pull: { savedBooks: { bookId } },
          },
          {
            new: true,
          }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Please Login!");
    },
  },
};

module.exports = resolvers;
