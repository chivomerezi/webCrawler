const { Schema, model } = require('mongoose');

const TPPSchema = new Schema(
    {
        sitio: { 
            type: String
        },

        palabra: {
            type: String
        },

        tag: {
            type: String
        }


    });

    module.exports = model('TPP', TPPSchema);