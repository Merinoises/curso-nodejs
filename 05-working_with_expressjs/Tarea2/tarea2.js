const express = require('express');

const app = express();

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/users', (req, res, next) => {
    console.log('Estamos en usuarios');
});

app.use('/', (req, res, next) => {
    console.log('Esto NO es usuarios!!!!');
    res.send('<p>Esto qué es</p>');
});


app.listen(3000);