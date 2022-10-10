const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;



const dbConfig = `mongodb+srv://${dbUser}:${dbPass}@notesonline.tg3xak6.mongodb.net/notes?retryWrites=true&w=majority`;

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.export = connection;