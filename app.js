const express = require('express');
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require('cors')
const categorieRoute = require('./routes/categorie.route')
const scategorieRoute = require('./routes/scategorie.route')
const articleRoute = require('./routes/article.route')
const userRoute = require('./routes/user.route')
const paymentRouter = require("./routes/payment.route.js");

const app = express();

dotenv.config()

app.use('/api/payment', paymentRouter);
app.use(cors())
app.use(express.json());
app.use('/api/categorie', categorieRoute)
app.use('/api/scategorie', scategorieRoute)
app.use('/api/article', articleRoute)
app.use('/api/user', userRoute)

mongoose.connect(process.env.DATABASECLOUD)
    .then(() => { console.log("DataBase Successfully Connected"); })
    .catch(err => {
        console.log(`Unable to connect to database: ${err}`);
        process.exit();
    });

port = process.env.PORT || "3001"
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


module.exports = app;
