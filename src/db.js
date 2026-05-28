const mongoose = require('mongoose');
const mongoosePkg = require('mongoose/package.json');

const localMongoUri = 'mongodb://127.0.0.1:27017/simple-mern';
const useLocalMongo = process.env.USE_LOCAL_MONGODB === 'true';
const mongoUri = process.env.MONGODB_URI || (useLocalMongo ? localMongoUri : null);
const isRender = process.env.RENDER === 'true';
const isLocalMongoUri = typeof mongoUri === 'string' && /127\.0\.0\.1|localhost/.test(mongoUri);

console.log('[db-bootstrap] node=%s mongoose=%s render=%s commit=%s', process.version, mongoosePkg.version, process.env.RENDER || 'false', process.env.RENDER_GIT_COMMIT || 'unknown');

if (isRender && (!process.env.MONGODB_URI || isLocalMongoUri)) {
	console.error('Render requires a non-local MONGODB_URI (Atlas). Refusing to use localhost.');
	process.exit(1);
}

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
