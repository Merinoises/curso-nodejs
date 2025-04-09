const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const users = [];

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/users', (req, res, next) => {
    res.render('users', {
        pageTitle: 'Usuarios',
        users: users
    });
});

app.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Add user'
    });
});

app.post('/add-user', (req, res, next) => {
    users.push({nombre: req.body.username});
    res.redirect('/users');
});


app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page not jajajjajajajajja' });
});

app.listen(3000);

