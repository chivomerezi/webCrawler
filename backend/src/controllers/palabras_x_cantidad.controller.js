const CGCtrl = {};
const Category = require('../models/Palabras_x_cantidad');

const pool = require('../database'); 


CGCtrl.getPalabras_x_cantidad = async (req, res) => {

    const CG = await pool.query('SELECT * FROM palabras_x_cantidad');
    console.log(CG);
    res.json(CG);

};



module.exports = CGCtrl;