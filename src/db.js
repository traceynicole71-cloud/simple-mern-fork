const mongoose = require('mongoose');

const localMongoUri = 'mongodb://127.0.0.1:27017/simple-mern';
const useLocalMongo = process.env.USE_LOCAL_MONGODB === 'true';
const mongoUri = process.env.MONGODB_URI || (useLocalMongo ? localMongoUri : null);

if (!mongoUri) {
	console.error('Missing MONGODB_URI. Set it in Render, or set USE_LOCAL_MONGODB=true for local development.');
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
