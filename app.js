
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const connectMongo = require('./config/connectMongo');


const app = express();
const PORT = process.env.PORT || 3000;
const appRouter = express.Router();

const methodOverride = require('method-override');
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('', appRouter);
require('./Routers')(appRouter);
require('./API_Route')(appRouter);

// const connectMongo = require('./config/connectMongo');
// This function return promiss if mongoDB connection succeed
connectMongo()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server is started at ' + PORT);
        });
    });