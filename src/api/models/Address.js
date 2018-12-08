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
        province: { //省份|直辖市
            type: DataTypes.STRING,
            allowNull: false
        },
        city: { //直辖市|市
            type: DataTypes.STRING,
            allowNull: false
        },
        area: { // 区/县/县级市
            type: DataTypes.STRING,
            allowNull: false
        },
        isCurrenLive: { //是否是当前居住地.0-否  1-是
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }
};

module.exports.options = {
    classMethods: {
        associate: (models) => {}
    }
};