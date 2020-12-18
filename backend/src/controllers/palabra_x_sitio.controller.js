const PXSCtrl = {};
const Category = require('../models/Palabra_x_sitio');

const pool = require('../database'); 


PXSCtrl.getPalabra_x_sitio = async (req, res) => {
    var pal = req.params.palabra;
    pal = pal.replace(/ /g, "' OR t1.palabra = '");
    var query = `SELECT t1.sitio, t1.palabra, t1.tag, t2.cantidad  
    FROM
	palabra_x_sitio_x_tag AS t1 
	INNER JOIN 
	cantidad_x_palabra_x_sitio AS t2
	ON t1.sitio = t2.sitio
	AND t1.palabra = t2.palabra
    WHERE t1.palabra = '` + pal + `' ORDER BY FIELD(tag, 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'p', 'alt') ASC, t2.cantidad DESC;`   

    const PXS = await pool.query(query);
    console.log(PXS);
    res.json(PXS);

};



module.exports = PXSCtrl;