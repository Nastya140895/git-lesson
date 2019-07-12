const { ApolloServer, gql } = require('apollo-server');
const { buildSchema } = require('graphql');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.



const allUsers = [
   {
        userId: "1",
        userAvatar: "http://pngimg.com/uploads/swan/swan_PNG57.png",
        userName: "Anna",
        messages: ["1", "2"]
    },
    {
        userId: "2",
        userAvatar: "http://pngimg.com/uploads/dolphin/dolphin_PNG71373.png",
        userName: "Sophia",
        messages: ["4"]
    },
    {
        userId: "3",
        userAvatar: "http://pngimg.com/uploads/kangaroo/kangaroo_PNG19.png",
        userName: "Sergey",
        messages: ["3"]
    },
    {
        userId: "4",
        userAvatar: "http://pngimg.com/uploads/lemur/lemur_PNG35.png",
        userName: "Andrew",
        messages: ["5"]
    },
];

const allMessages = [
    {
        title: "Title12",
        shortContent: "How are youuuu",
        content: "Khiui huihuihu gyitgf7yiyvikcyt7i",
        id: "2"
    },
    {
        title: "Title2",
        shortContent: "Bye!",
        content: "Bye!Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eiu",
        id: "1"
    },
    {
        title: "Title3",
        shortContent: "Fine, thanks",
        content: "Fine, thanks.On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure",
        id: "4"
    },
    {
        title: "Title333333333",
        shortContent: "Fine, thanks",
        content: "Fine, thanks.On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure",
        id: "3"
    },
    {
        title: "Title5555555555",
        shortContent: "Fine, thanks",
        content: "Fine, thanks.On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure",
        id: "5"
    },
]



const typeDefs = gql`

  # This "User" type can be used in other type declarations.

  type User {
    userId: String,
    userAvatar: String,
    userName: String,
    messages: [Message]

  }

  type Message {
    id: String,
    title: String,
    shortContent: String,
    content: String,
  }

  type Query {
    allUsers: [User],
    allMessages: [Message],
    user(userId: String): User,
    messOfUser(id: String): Message,
    mess: [Message],
    messages: [Message]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
    //     messages: (parent, args, context, info) => {
    //         return messages.filter(
    //             ({messages}) => messages.indexOf(parent.id) !== -1
    //         );
    //    },    
        //allMessages: (parent, args, context, info) => {
        //    return allMessages;
        //},
        allUsers: (parent, args, context, info) => {
             return allUsers;
        },

        mess: (parent, { title }, context, info) => {
            return allMessages.filter(mes => mes.title ==="Title333333333");
        },

        allUsers: (parent, {messages}, context, info) => {
             return allUsers.filter(us => us.messages.indexOf(parent.id) !== -1);
       },

        // user: (parent, { userId }, context, info) => {
        //     return allUsers.find(user => user.userId === userId);
        // },
        messOfUser: (parent, { userId }, context, info) => {
            return allMessages.filter(mess => mess.userId === userId);
        },
    }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});