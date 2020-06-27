const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: { type: String },
	birthDate: { type: String },
	sex: { type: String },
	country: { type: String },
	IDnumber: { type: String },
	words: { type: String },
	prefession: { type: String },
});

module.exports = mongoose.model('TableDatas', schema);
