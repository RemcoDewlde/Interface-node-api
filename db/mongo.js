const {connect, connection} = require("mongoose");

connect(`mongodb://${process.env.DATABASE_IP}/${process.env.DATABASE_NAME}`, {
    // mongo settings:
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = connection;
