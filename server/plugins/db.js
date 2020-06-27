module.exports = app => {
	
	const mongoose = require('mongoose');
	
	mongoose.set('useFindAndModify', false);
	
	mongoose.connect('mongodb://localhost:27017/manage-system', {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	
}