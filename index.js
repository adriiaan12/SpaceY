const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 8080;
const baseAPI = '/api/v1';
const { connectDb } = require('./routes/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

const viajes = require('./routes/viajes');
app.use('/viajes', viajes);

const server = http.createServer(app);
async function startServer() {
    try {
        await connectDb();
        server.listen(PORT, function () {
            console.log("Server up and running on localhost:" + PORT);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
startServer();

