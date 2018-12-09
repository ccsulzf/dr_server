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
        fundAccountId: { // 用户ID
            type: DataTypes.INTEGER,
            allowNull: false
        },

        creditAmount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        usedAmount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        billDay: {
            type: DataTypes.STRING,
            allowNull: false
        },
        repaymentDay: {
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