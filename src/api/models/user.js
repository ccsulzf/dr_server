/**
 * Created by Administrator on 2016-11-23.
 */
'use strict';

module.exports.attributes = (DataTypes) => {
	return {
		id: {                               //主键
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {                     //用户名
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {                     //邮箱
			type: DataTypes.STRING,
			allowNull: false
		},
		password:{					//密码
			type: DataTypes.STRING,
			allowNull: false
		}
	}
};

module.exports.options = {
	classMethods: {
		associate: (models) => {
		}
	}
};
