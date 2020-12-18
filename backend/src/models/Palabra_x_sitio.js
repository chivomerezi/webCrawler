const { Schema, model } = require('mongoose');

const PXSSchema = new Schema(
    {
        palabra: { 
            type: String
        },

        sitio: {
            type: String
        }


    });

    module.exports = model('PXS', PXSSchema);