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
        fundWayId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: { // name
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        isCredit: { //支付方式 1.现金支付 2.电子支付
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