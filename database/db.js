var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1/bt', { useMongoClient: true },function(error) {
    if (error) {
        console.log('Can not connect to Database', error);
    } else {
      console.log('Database Connected Successfully');
   }
});
