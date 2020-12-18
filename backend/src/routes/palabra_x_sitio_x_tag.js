const {Router} = require('express');
const router = Router();

const { getPalabra_x_sitio_x_tag } = require('../controllers/palabra_x_sitio_x_tag.controller');

router.route('/')
        .get(getPalabra_x_sitio_x_tag)


module.exports = router