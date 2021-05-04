global.XMLHttpRequest = require("xhr2");
const express = require('express');
const app = express();
const port = 8000; // default port to listen
const exphbs = require('express-handlebars')
const tiket = require('./routes/tiket')
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname:'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine','hbs')
app.set('views', 'views')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(tiket)

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});