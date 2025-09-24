const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Database is connected.')
}).catch(err => console.log(err.message))