// process.env.NODE_ENV = 'test';

// beforeEach('Clean Database', function () {
//     const sequelize = db.sequelize;
//     return sequelize.sync({force: true});
// });

process.env.NODE_ENV = 'test';

import app from '../src/app.js';
import supertest from 'supertest';

const request = supertest.agent(app.listen());

global.app = app;
global.request = request;

beforeEach('Clean Database', function () {
	const sequelize = db.sequelize;
	return sequelize.sync({force: false});
});