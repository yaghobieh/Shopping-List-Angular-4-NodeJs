let mongoose = require('mongoose');

const ShoppingListSchema = mongoose.Schema({
    itemName: {type: String, required: true},
    itemQuantity: {type: Number, required: true},
    itemBought: {type: Boolean, required: true}
});

let Item = module.exports = mongoose.model('Item', ShoppingListSchema);