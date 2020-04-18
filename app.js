require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const middleware = require("./middlewares");

// routes
const indexRouter = require("./routes/indexrouter");
const auth = require("./auth/auth");

let app = express();

// setup middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(helmet());

// routes
app.use('/', indexRouter);
app.use('/auth', auth);

// error middleware
app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`[Server] Running on port ${process.env.PORT}`)
});
