const TPPCtrl = {};
const Category = require('../models/Palabra_x_sitio_x_tag');

const pool = require('../database'); 


TPPCtrl.getPalabra_x_sitio_x_tag = async (req, res) => {

    const TPP = await pool.query('SELECT * FROM palabra_x_sitio_x_tag');
    console.log(TPP);
    res.json(TPP);

};



module.exports = TPPCtrl;