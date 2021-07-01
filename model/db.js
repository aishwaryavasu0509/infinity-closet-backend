const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aish:aish@2000@cluster0.cdjiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./item.model');