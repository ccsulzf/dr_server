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

    async getFundCount(userId) {
        let fundCountList = await FundAccount.findAll({
            where: {
                userId: userId
            },
            raw: true,
            nest: true
        });
        if (fundCountList && fundCountList) {
            for (let item of fundCountList) {
                const creditAccount = await CreditAccount.find({
                    where: {
                        fundAccountId: item.id
                    },
                    raw: true,
                    nest: true
                });

                const fundAccountChannelList = await FundAccountChannel.findAll({
                    where: {
                        fundAccountId: item.id
                    },
                    raw: true,
                    nest: true
                });

                const fundChannelList = await FundChannel.findAll({
                    where: {
                        id: {
                            $in: _.map(fundAccountChannelList, 'fundChannelId')
                        }
                    },
                    raw: true,
                    nest: true
                })

                item.creditAccount = creditAccount;
                item.fundChannelList = fundChannelList;
            }
        }
        return fundCountList;
    }

    async addFundCount(addFundAccount, creditAccount, fundChannelList) {
        let  fundAccount;
        let fund = await FundAccount.create(addFundAccount, {
            transaction: this.transaction,
            raw: true,
            nest: true
        });
        fundAccount = fund.dataValues;
        if (fundAccount && fundAccount.isCredit) {
            creditAccount.fundAccountId = fundAccount.id;
            let credit = await CreditAccount.create(creditAccount, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });
            if (credit) {
                fundAccount.creditAccount = credit.dataValues;
            }
        }
        if (fundAccount && fundChannelList.length) {
            const fundAccountChannelList = [];
            for (const item of fundChannelList) {
                fundAccountChannelList.push({
                    fundAccountId: fundAccount.id,
                    fundChannelId: item.id
                });
            }
            await FundAccountChannel.bulkCreate(fundAccountChannelList, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });
            fundAccount.fundChannelList = fundChannelList;
        }
        return fundAccount;
    }
}