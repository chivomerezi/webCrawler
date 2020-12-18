const { Schema, model } = require('mongoose');

const CGSchema = new Schema(
    {
        
        palabra: {
            type: String
        },

        cantidad: {
            type: Number
        }


    });

    module.exports = model('CG', CGSchema);