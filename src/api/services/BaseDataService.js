/**
 * Created by wp on 2017-01-05.
 */

import * as _ from 'lodash';
export class BaseDataService {
    constructor(transaction) {
        this.transaction = transaction || null;
    }

    async addLabel(label) {
        return await Label.findOrCreate({
            where: {
                type: label.type,
                name: label.name,
                userId: label.userId
            }
        }).spread((result, created) => {
            return result.get({
                plain: true
            });
        });
    }


}