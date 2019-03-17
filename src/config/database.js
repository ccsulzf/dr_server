module.exports = {
    development: {
		username: process.env.DATABASE_USERNAME_DEV || 'root',
		password: process.env.DATABASE_PASSWORD_DEV || '123456',
		database: process.env.DATABASE_NAME_DEV || 'dr-test',
		host: process.env.DATABASE_HOST_DEV || 'localhost',
        dialect: 'mysql',
        timezone: '+08:00',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    },
    test: {
	    username: process.env.DATABASE_USERNAME_DEV || 'all580',
	    password: process.env.DATABASE_PASSWORD_DEV || 'all580',
	    database: process.env.DATABASE_NAME_DEV || 'WSMS1201',
	    host: process.env.DATABASE_HOST_DEV || '192.168.1.238',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    },
    production: {
        username: process.env.DATABASE_USERNAME_DEV || 'all580',
        password: process.env.DATABASE_PASSWORD_DEV || 'all580',
        database: process.env.DATABASE_NAME_DEV || 'WSMS0217',
        host: process.env.DATABASE_HOST_DEV || '192.168.1.238',
        dialect: 'mysql',
        timezone: '+08:00',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
};