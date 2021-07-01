const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: 'This field is required.'
    },
    itemCategory: {
        type: String
    },
    itemDescription: {
        type: String
    },
    itemPrice: {
        type: Number
    }
});

mongoose.model('item', itemSchema);