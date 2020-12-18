const {Router} = require('express');
const router = Router();

const { getCantidad_x_palabra_x_sitio } = require('../controllers/cantidad_x_palabra_x_sitio.controller');

router.route('/')
        .get(getCantidad_x_palabra_x_sitio)


module.exports = router