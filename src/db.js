const mongoose = require('mongoose');

const localMongoUri = 'mongodb://127.0.0.1:27017/simple-mern';
const mongoUri = process.env.MONGODB_URI || (process.env.NODE_ENV !== 'production' ? localMongoUri : null);

if (!mongoUri) {
	console.error('Missing MONGODB_URI in production. Set this environment variable in Render.');
	process.exit(1);
}

mongoose
	.connect(mongoUri)
	.then(() => console.log('MongoDB connected'))
	.catch(err => {
		console.error('MongoDB connection error:', err.message);
		process.exit(1);
	});

module.exports = mongoose;
