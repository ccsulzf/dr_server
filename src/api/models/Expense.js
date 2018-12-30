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
        addressId: { // 地点ID
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expenseCategoryId: { // 支出类型ID
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fundWayId: { // 资金来往方式ID
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fundAccountId: { // 资金账户ID
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fundPartyId: { //资金来往方ID
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expenseDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }
};

module.exports.options = {
    classMethods: {
        associate: (models) => {}
    }
};