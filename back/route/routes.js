let express = require('express');
let router  = express.Router();

//Model
let Item = require('../model/shoppingItem');

router.get('/items', (req, res, next)=> {
    Item.find((err, items)=> {
        if(err) res.json({success: false, message: err});
        res.json({success: true, message: items});
    })
})

router.post('/item', (req, res, next)=> {
    let itemName = req.body.itemName;
    let itemQuantity = req.body.itemQuantity;
    let itemBought = req.body.itemBought;

    //Check values
    req.checkBody('itemName', 'Item name is required').notEmpty();
    req.checkBody('itemQuantity', 'Item quantity is required').notEmpty();
    req.checkBody('itemBought', 'Item bought is required').notEmpty();

    let errors = req.validationErrors();
    
    if(errors){
        res.json({success: false, message: errors});
    } else {
        let newItem = new Item({
            itemName: itemName,
            itemQuantity: itemQuantity,
            itemBought: itemBought
        });

        newItem.save((err)=> {
            if(err) res.json({success: false, message: err});
            res.json({success: true, message: 'Saved successfully'});
        })
    }
})

router.put('/item/:id', (req, res, next)=> {

    Item.findOneAndUpdate({_id: req.params.id}, {
        $set:{
            itemName: req.body.itemName,
            itemQuantity: req.body.itemQuantity,
            itemBought: req.body.itemBought
        }
    }, (err, item)=> {
        if(err) res.json({success: false, message: err});
        res.json({success: true, message: 'Saved successfully ' +item});
    })
})

router.delete('/item/:id', (req, res, next)=> {
    Item.remove({_id: req.params.id}, (err, item)=>{
        if(err) res.json({success: false, message: err});
        res.json({success: true, message: item});
    })
})

module.exports = router;

