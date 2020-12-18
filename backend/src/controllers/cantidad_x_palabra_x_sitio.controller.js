const CPPSCtrl = {};
const Category = require('../models/Cantidad_x_palabra_x_sitio');

const pool = require('../database'); 


CPPSCtrl.getCantidad_x_palabra_x_sitio = async (req, res) => {

    const CPPS = await pool.query('SELECT * FROM cantidad_x_palabra_x_sitio');
    console.log(CPPS);
    res.json(CPPS);

};



module.exports = CPPSCtrl;