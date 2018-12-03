module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('User', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: ''
            },
            nickname: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: ''
            },
            created_at: {
                type: Sequelize.DATE
            },
            updated_at: {
                type: Sequelize.DATE
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: false,
                /**
                 * if this type is DATE,
                 * defaultValue must be a Date,
                 * otherwise paranoid is useless
                 */
                defaultValue: new Date(0)
            }
        });
    },

    down: function (queryInterface, _Sequelize) {
        return queryInterface.dropTable('User');
    }
};
