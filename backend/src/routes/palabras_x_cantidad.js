const {Router} = require('express');
const router = Router();

const { getPalabras_x_cantidad } = require('../controllers/palabras_x_cantidad.controller');

router.route('/')
        .get(getPalabras_x_cantidad)


module.exports = router