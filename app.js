const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Pug engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// 4 form submissions
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Route 
app.get('/user/:name', (req, res) => {
    const { name } = req.params;
    res.send(`Hello, ${name}!`);
});

// form
app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send('Form submitted successfully!');
});

// Downloading route
app.get('/download', (req, res) => {
    const file = path.join(__dirname, 'downloads', 'example.jpg');
    res.download(file); // download file
});

// server start up
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});