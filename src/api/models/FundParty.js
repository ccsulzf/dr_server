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
        category: { // 类别 1.个人 2.非个人
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: { //1.支出 2.收入
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: { //商家名
            type: DataTypes.STRING,
            allowNull: false
        },
        memo: { //备注
            type: DataTypes.STRING,
            allowNull: true
        }
    }
};

module.exports.options = {
    classMethods: {
        associate: (models) => {}
    }
};