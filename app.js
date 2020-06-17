require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const middleware = require("./middlewares");
const authMiddleware = require("./auth/middleware");
const cors = require('cors');

// routes
const auth = require("./auth/auth");
const guides = require("./routes/guides");
const templates = require("./routes/templates");
const pricecards = require("./routes/pricecards");
const users = require("./routes/users");


let app = express();

app.use(cors());
app.use(helmet());

// setup middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(authMiddleware.checkTokenSetUser);

// routes
app.use('/api/v1/me', (req, res) => {
    res.json({
        user: req.user
    })
});
app.use('/api/v1/online', (req, res) => {
    res.json({
        message: 'Online'
    })
});

app.use('/auth', auth);
app.use('/api/v1/guides', authMiddleware.isLoggedIn, guides);
app.use('/api/v1/templates', authMiddleware.isLoggedIn, templates);
app.use('/api/v1/pricecards', authMiddleware.isLoggedIn, pricecards);
app.use('/api/v1/users', authMiddleware.isLoggedIn, users);


// error middleware
app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`[Server] Running on port ${process.env.PORT}`)
});
