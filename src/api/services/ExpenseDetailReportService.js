import * as _ from 'lodash';
import moment from 'moment';
export class ExpenseDetailReportService {
    constructor(transaction) {
        this.transaction = transaction || null;
        this.fieldMaps = [{
            name: 'Expense',
            scheme: 'e',
            fields: ['userId', 'expenseBookId', 'expenseDate']
        }, {
            name: 'ExpenseDetail',
            scheme: 'ed',
            fields: ['expenseId', 'addressId', 'expenseCategoryId', 'fundChannelId', 'fundAccountId',
                'fundPartyId', 'content', 'amount', 'memo'
            ]
        }]
    }

    _getField(fieldName) {
        for (let fieldMap of this.fieldMaps) {
            for (let field of fieldMap.fields) {
                if (field == fieldName) {
                    return {
                        table: fieldMap.name,
                        scheme: fieldMap.scheme,
                        field: fieldName
                    }
                }
            }
        }
        return null;
    }

    /*
     *dateTime:日期
     *conditions:筛选条件
     *pagination:分页
     */
    async getDetail({
        dateTime,
        conditions,
        pagination
    }) {
        try {
            let dateSQL = this._bindDate(dateTime);
            let selectSQL = this._bindSelect(conditions);
            let filterSQL = conditions ? this._bindFilter(conditions) : '';

            let joinSQL = ` FROM 
                            Expense AS e 
                            INNER JOIN ExpenseDetail AS ed ON e.id=ed.expenseId`;
            let sql = selectSQL + joinSQL + dateSQL + filterSQL + ' ORDER BY e.expenseDate DESC';

            return await this._execSql(sql);
        } catch (error) {
            throw error;
        }
    }

    _bindFilter(conditions) {
        let filter = '';
        for (let condition of conditions) {
            let field = this._getField(condition.field);
            if (field) {
                switch (condition.type) {
                    case 'equal':
                        if (Array.isArray(condition.value)) {
                            if (condition.value.length > 1) {
                                filter += ' AND ' + field.scheme + '.' + condition.field + ' IN (' + condition.value.join(',') + ')';
                            } else if (condition.value.length === 1) {
                                filter += ' AND ' + field.scheme + '.' + condition.field + '=' + condition.value[0];
                            }
                        }
                        break;
                    case 'contain':
                        filter += ' AND ' + field.scheme + '.' + condition.field + ' LIKE \'%' + condition.value + '%\'';
                        break;
                    case 'range':
                        if (condition.value) {
                            if (condition.value.start) {
                                filter += ' AND ' + field.scheme + '.' + condition.field + '>=' + condition.value.start;
                            }
                            if (condition.value.end) {
                                filter += ' AND ' + field.scheme + '.' + condition.field + '<=' + condition.value.end;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return filter;
    }

    _bindSelect() {
        let select = 'SELECT ';
        for (let fieldMap of this.fieldMaps) {
            let scheme = fieldMap.scheme;
            for (let field of fieldMap.fields) {
                select += scheme + '.' + field + ',';
            }
        }
        return select.substr(0, select.length - 1);
    }


    _bindDate(dateTime) {
        let timeSql = '';
        dateTime.start = new Date(dateTime.start);
        dateTime.end = new Date(dateTime.end);

        if (dateTime.type === 'day') {
            timeSql = ' e.expenseDate >= \'' + moment(dateTime.start).format('YYYY-MM-DD') + '\' AND e.expenseDate <= \'' + moment(dateTime.end).format('YYYY-MM-DD') + '\'';
        } else if (dateTime.type === 'month') {
            timeSql = ' e.expenseDate >= \'' + moment(dateTime.start).format('YYYY-MM-01') + '\' AND e.expenseDate <= \'' + moment(dateTime.end).format('YYYY-MM-31') + '\'';
        } else if (dateTime.type === 'year') {
            timeSql = ' e.expenseDate >= \'' + moment(dateTime.start).format('YYYY-01-01') + '\' AND e.expenseDate <= \'' + moment(dateTime.end).format('YYYY-12-31') + '\'';
        }
        return ' WHERE ' + timeSql;
    }

    async _execSql(sql) {
        return await db.sequelize.query(sql, {
            raw: true,
            nest: true,
            transaction: this.transaction
        });
    }
}