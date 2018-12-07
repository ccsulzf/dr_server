/**
 * Created by Administrator on 2016-11-23.
 */
'use strict';

module.exports.attributes = (DataTypes) => {
    return {
        id: { //主键
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: { // 用户ID
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: { //用户名
            type: DataTypes.STRING,
            allowNull: false
        },
        memo: { //邮箱
            type: DataTypes.STRING,
            allowNull: false
        }
    }
};

module.exports.options = {
    classMethods: {
        associate: (models) => {}
    }
};