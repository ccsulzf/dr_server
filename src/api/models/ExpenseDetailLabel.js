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
        labelId: { // 用户ID
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expenseDetailId: { // 用户ID
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }
};

module.exports.options = {
    classMethods: {
        associate: (models) => {}
    }
};