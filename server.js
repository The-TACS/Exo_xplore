const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Mock user data for demonstration purposes
const users = [];

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'space_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Serve static files
app.use(express.static('public'));

// Home Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Login Route
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.send('<h2>Login Successful</h2><p><a href="/">Go to Home</a></p>');
    } else {
        res.send('<h2>Login Failed</h2><p>Invalid username or password. <a href="/login">Try again</a></p>');
    }
});

// Signup Route
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const userExists = users.some(u => u.username === username);

    if (userExists) {
        res.send('<h2>Signup Failed</h2><p>Username already exists. <a href="/signup">Try again</a></p>');
    } else {
        users.push({ username, email, password });
        res.send('<h2>Signup Successful</h2><p><a href="/login">Login now</a></p>');
    }
});

// Server Listen
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
