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
                item.fundCount = creditAccount;
            }
        }
        return fundCountList;
    }

    async login(nameOrEmali, password) {
        let data = await User.find({
            where: {
                $or: [{
                    name: nameOrEmali
                }, {
                    email: nameOrEmali
                }],
                password: password
            }
        });
        return data;
    }
}