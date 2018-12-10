/**
 * Created by wp on 2017-01-05.
 */
export class BaseDataService {
    constructor(transaction) {
        this.transaction = transaction || null;
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
                item.creditAccount = creditAccount;
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
        console.info(fund);
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