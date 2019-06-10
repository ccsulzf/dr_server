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
        transferDate: { // 转账日期
            type: DataTypes.STRING,
            allowNull: false
        },
        outFundAccountId: { // 转出账户
            type: DataTypes.INTEGER,
            allowNull: false
        },
        inFundAccountId: { // 转入账户
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isHandle: { // 是否需要手续费
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        handleFee: { // 手续费多少
            type: DataTypes.FLOAT,
            allowNull: false
        },
        amount: { //转账金额
            type: DataTypes.FLOAT,
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