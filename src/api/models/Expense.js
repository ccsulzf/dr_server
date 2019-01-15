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
        expenseBookId: { // 账本ID
            type: DataTypes.INTEGER,
            allowNull: false
        },  
        expenseDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    }
};

module.exports.options = {
    classMethods: {
        associate: (models) => {}
    }
};