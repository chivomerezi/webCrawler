const express = require('express');
const cors = require('cors'); 
const app = express();

// settings
app.set('port', process.env.PORT || 5000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/palabra_x_sitio', require('./routes/palabra_x_sitio'));
app.use('/palabras_x_cantidad', require('./routes/palabras_x_cantidad'));
app.use('/palabra_x_sitio_x_tag', require('./routes/palabra_x_sitio_x_tag'));
app.use('/cantidad_x_palabra_x_sitio', require('./routes/cantidad_x_palabra_x_sitio'));

module.exports = app;