const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { createHandler, shouldRenderGraphiQL } = require('graphql-http/lib/use/express');
const { renderGraphiQL } = require('graphql-http');

const schema = require('./graphql/schema');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const MONGODB_URI = process.env.MONGODB_URI_REST;

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        //en este callback, "null" es el error
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + file.originalname)
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/graphql', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(
        renderGraphiQL({
            endpoint: '/graphql',
            // Enable for mutations/subscriptions
            subscriptionsEndpoint: undefined,
        })
    );
});

app.all('/graphql', createHandler({ schema }));


// app.use(
//     'graphql',
//     graphqlHttp({
//         schema: GraphQLSchema,
//         rootValue: graphqlResolver,
//         graphiql: true
//     })
// );

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})

mongoose.connect(MONGODB_URI)
    .then(result => {
        const server = app.listen(8080);
    })
    .catch(err => console.log(err));