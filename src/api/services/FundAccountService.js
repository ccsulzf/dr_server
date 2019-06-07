import moment from 'moment';
import * as _ from 'lodash';
export class FundAccountService {
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
        let fundAccount;
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

    /**
     * 编辑账户
     * @param id fundAccount.id
     * @param amount 金额
     * @param {'plus','cut'}  type 处理类型
     */
    async editFundCountAmount(id, type, amount) {
        // console.info(id, type, amount);
        try {
            if (!(id && type && (amount || amount === 0))) {
                throw '缺少参数';
            }
            const fundAccount = await FundAccount.find({
                where: {
                    id: id
                },
                raw: true,
                nest: true
            });
            let creditAccount;
            if (fundAccount.isCredit == 1) {
                creditAccount = await CreditAccount.find({
                    where: {
                        fundAccountId: id
                    },
                    raw: true,
                    nest: true
                });
            }
            // 余额+,已使用额度-
            // 余额-,已使用额度+
            if (type === 'plus') {
                fundAccount.balance = (fundAccount.balance * 100 + amount * 100) / 100;
                if (creditAccount) {
                    creditAccount.usedAmount = (creditAccount.usedAmount * 100 - amount * 100) / 100;
                }
            } else {
                fundAccount.balance = (fundAccount.balance * 100 - amount * 100) / 100;
                if (creditAccount) {
                    creditAccount.usedAmount = (creditAccount.usedAmount * 100 + amount * 100) / 100;
                }
            }

            await FundAccount.update({
                balance: fundAccount.balance
            }, {
                where: {
                    id: id
                },
                transaction: this.transaction
            });

            if (creditAccount) {
                await CreditAccount.update({
                    usedAmount: creditAccount.usedAmount
                }, {
                    where: {
                        id: creditAccount.id
                    },
                    transaction: this.transaction
                });
            }
            return fundAccount;
        } catch (error) {
            throw error;
        }
    }
}