/**
 * Created by wp on 2017-01-05.
 */
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
                let creditAccount = await CreditAccount.find({
                    where: {
                        fundAccountId: item.id
                    },
                    raw: true,
                    nest: true
                });

                let fundChannelIds = await FundAccountChannel.find({
                    where: {
                        fundAccountId: item.id
                    },
                    raw: true,
                    nest: true
                });
                item.creditAccount = creditAccount;
                item.fundChannelIds = fundChannelIds;
            }
        }
        return fundCountList;
    }

    async addFundCount(fundAccount, creditAccount) {
        let fund = await FundAccount.create(fundAccount, {
            transaction: this.transaction,
            raw: true,
            nest: true
        });
        if (fund && fundAccount.isCredit) {
            creditAccount.fundAccountId = fund.id;
            let credit = await CreditAccount.create(creditAccount, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });
            if (credit) {
                fund.creditAccount = credit;
            }
        }
        return fund;
    }
}