const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html lang="es">');
        res.write('<head><meta charset="UTF-8"><title>Tarea 1</title></head>');
        res.write('<body><h1>Hola, ¿qué tal? Accediendo a Antonio Merino</h1><form action="/create-user" method="POST"><input type="text" name="nuevo-usuario"><button type="submit">Crear usuario</button></form></body>')
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html lang="es">');
        res.write('<head><meta charset="UTF-8"><title>Lista de usuarios - Tarea 1</title></head>');
        res.write('<body><h1>Usuarios</h1><ul><li>Antonio Merino</li><li>Myriam Prieto</li><li>Valentina Merino</li></ul></body>')
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();
        });
    }
});

server.listen(3000);