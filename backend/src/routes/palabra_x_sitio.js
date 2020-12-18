const {Router} = require('express');
const router = Router();

const { getPalabra_x_sitio } = require('../controllers/palabra_x_sitio.controller');

router.route('/:palabra')
        .get(getPalabra_x_sitio)


module.exports = router