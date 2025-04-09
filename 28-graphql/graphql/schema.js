const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInputObjectType
} = require('graphql');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        status: { type: new GraphQLNonNull(GraphQLString) },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType)))
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        imageUrl: { type: new GraphQLNonNull(GraphQLString) },
        creator: {
            type: new GraphQLNonNull(UserType),
            resolve: (post) => post.creator
        },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        updatedAt: { type: new GraphQLNonNull(GraphQLString) }
    })
})

const UserInputData = new GraphQLInputObjectType({
    name: 'UserInputData',
    fields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'Hello World'
      }
    }
  });

  const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      createUser: {
        type: UserType,
        args: {
          userInput: { 
            type: new GraphQLNonNull(UserInputData)
          }
        },
        resolve: async (parent, args, context) => {
          const { userInput } = args;
          
          const existingUser = await User.findOne({ email: userInput.email });
          if (existingUser) {
            throw new Error('User exists already!');
          }
  
          const hashedPw = await bcrypt.hash(userInput.password, 12);
          const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPw,
            status: 'New User'  // Default status
          });
  
          const createdUser = await user.save();
          return { 
            ...createdUser._doc, 
            _id: createdUser._id.toString(),
            // Add any other necessary transformations
          };
        }
      }
    }
  });
  
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
  });

//Implementación antigua del curso:

// module.exports = buildSchema(`

//         type Post {
//             _id: ID!
//             title: String!
//             content: String!
//             imageUrl: String!
//             creator: User!
//             createdAt: String!
//             updatedAt: String!
//         }

//         type User {
//             _id: ID!
//             name: String!
//             email: String!
//             password: String
//             status: String!
//             posts: [Post!]!
//         }

//         input UserInputData {
//             email: String!
//             name: String!
//             password: String!
//         }

//         type RootQuery {
//             hello: String
//         }

//         type RootMutation {
//             createUser(userInput: UserInputData): User!
//         }

//         schema {
//             query: RootQuery
//             mutation: RootMutation
//         }
//     `)

//1. Definimos el TestData type
// const TestData = new GraphQLObjectType({
//     name: 'TestData',
//     fields: {
//         text: { type: GraphQLString },
//         views: { type: GraphQLInt }
//     }
// });

//2. Definimos el RootQuery type
// const RootQuery = new GraphQLObjectType({
//     name: 'RootQuery',
//         fields: {
//             hola: {
//                 type: TestData,
//                 resolve: () => ({
//                     text: 'Hola Mundo!',
//                     views: 1234
//                 }),
//             },
//         },
// })

//3. Creamos el schema
// const schema = new GraphQLSchema({
//     query: RootQuery
// });

// module.exports = schema;

// module.exports = buildSchema(`
//         type TestData {
//             text: String!
//             views: Int!
//         }

//         type RootQuery {
//             hello: TestData!
//         }

//         schema {
//             query: RootQuery
//         }
//     `);