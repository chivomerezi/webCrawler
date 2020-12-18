const { Schema, model } = require('mongoose');

const CPPSSchema = new Schema(
    {
        sitio: { 
            type: String
        },

        palabra: {
            type: String
        },

        cantidad: {
            type: Number
        }


    });

    module.exports = model('CPPS', CPPSSchema);