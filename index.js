const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 8080;
const baseAPI = '/api/v1';
const { connectDb } = require('./routes/db');
const methodOverride = require('method-override');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});
app.use(express.static(path.join(__dirname, 'public')));

const viajes = require('./routes/viajes');
app.use('/viajes', viajes);

app.get('/hello', (req, res) => {
    res.send('Hello!');
});

app.get('/goodbye', (req, res) => {
    res.send('Goodbye!');
});

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

