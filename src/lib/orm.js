'use strict';
import fs from 'fs';
import path from 'path';
const debug = require('debug')('sequelize');
import Sequelize from 'sequelize';
import {
	env
} from '../config/config.js';
import database from '../config/database.js';

const config = database[env];
const db = {};
let sequelize = null;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, Object.assign({}, config, {
		logging: true,
		underscored: true,
		underscoredAll: true,
		isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
		define: {
			paranoid: true,
			underscored: true,
			freezeTableName: true,
			schemaDelimiter: '_',
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
			deletedAt: 'deletedAt'
		},
		// // 同步model到table
		// sync: { force: true },
	}));
}

export default function (dir, schema = '') {
	let models_path = dir || path.join(__dirname, '../', 'api/models');

	const loadModels = (modelsPath, schema) => {
		fs.readdirSync(modelsPath).forEach(filename => {
			let modelPath = path.resolve(modelsPath, filename),
				stats = fs.lstatSync(modelPath),
				isDirectory = stats.isDirectory(),
				validNameRegex = /^(.+)\.(js|json)/,
				isValidFile = validNameRegex.test(filename) || isDirectory;

			// keep .js, .json or directory
			if (!isValidFile) return;

			// load model recursively
			if (isDirectory) {
				loadModels(modelPath, filename);
			} else {
				let model = require(modelPath),
					name = filename.match(validNameRegex)[1];

				let {
					options = {}, attributes
				} = model;

				if (schema) {
					options.schema = schema;
				}

				if ('function' !== typeof attributes) {
					throw new Error(`实体${name}'的attributes没有找到`);
				}

				if (!sequelize.isDefined(name)) {
					sequelize.define(name, attributes(Sequelize), options);
				} else {
					debug(`model: ${name},is defined`);
				}
			}
		})
	};

	const associateModels = () => {
		const models = sequelize.models;
		if (!global.$models) global.$models = {};
		Object.keys(models).forEach(key => {
			if (!global.$models[key]) {
				let model = models[key];

				if ('associate' in model) {
					model.associate(models);
				}

				global[key] = model;

				debug(`model: ${model.name},associations: [${Object.keys(model.associations).join()}]`);
			}
		});
		global.$models = models;
	};

	const dynamicLoadModels = (modelsPath, schema) => {
		if (typeof (modelsPath) === 'object') {
			for (let path of modelsPath) {
				loadModels(path, schema);
			}
		} else {
			loadModels(modelsPath, schema);
		}

		associateModels();
	};
	db.dynamicLoadModels = dynamicLoadModels;

	dynamicLoadModels(models_path, schema);

	db.sequelize = sequelize;
	db.Sequelize = Sequelize;

	global.db = db;
	return db;
}