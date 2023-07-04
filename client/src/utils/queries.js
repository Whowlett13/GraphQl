import gql from "graphql-tag";

export const GET_CURRENT_USER = gql`
  {
    currentUser {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;
