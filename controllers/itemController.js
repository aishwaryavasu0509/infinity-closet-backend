const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('item');

router.get('/', (req, res) => {
    res.render("item/addOrEdit", {
        viewTitle: "Insert items"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var item = new item();
    item.itemName = req.body.itemName;
    item.itemCategory = req.body.itemCategory;
    item.itemDescription = req.body.itemDescription;
    item.itemPrice = req.body.itemPrice;
    item.save((err, doc) => {
        if (!err)
            res.redirect('item/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("item/addOrEdit", {
                    viewTitle: "Insert Items",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('item/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("item/addOrEdit", {
                    viewTitle: 'Update item',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("item/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'itemName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'itemCategory':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("item/addOrEdit", {
                viewTitle: "Update item",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/item/list');
        }
        else { console.log('Error in item delete :' + err); }
    });
});

module.exports = router;