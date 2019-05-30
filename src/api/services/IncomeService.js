import {
    FundAccountService
} from './FundAccountService';
import moment from 'moment';
import * as _ from 'lodash';
export class IncomeService {
    constructor(transaction) {
        this.transaction = transaction || null;
    }

    async getIncomeList(incomeListDate) {
        try {
            return await Income.findAll({
                where: {
                    endDate: {
                        $gte: moment(incomeListDate).format('YYYY-MM-01'),
                        $lte: moment(incomeListDate).endOf('month').format("YYYY-MM-DD")
                    }
                },
                raw: true,
                nest: true
            })
        } catch (error) {
            throw error;
        }
    }

    async add(data) {
        let income = data.income;
        let labelList = data.labelList;
        let participantList = data.participantList;
        let addIncome;
        const incomeData = await Income.create(data.income, {
            transaction: this.transaction,
            raw: true,
            nest: true
        });

        addIncome = incomeData.dataValues;

        const fundAccountService = new FundAccountService(this.transaction);
        await fundAccountService.editFundCountAmount(income.fundAccountId, 'plus', income.amount);

        if (labelList.length) {
            const labelIds = _.map(data.labelList, 'id');
            const incomeLabelList = [];
            for (const labelId of labelIds) {
                incomeLabelList.push({
                    incomeId: addIncome.id,
                    labelId: labelId
                });
            }
            await IncomeLabel.bulkCreate(incomeLabelList, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });
        }

        if (participantList.length) {
            const participantIds = _.map(participantList, 'id');
            const incomeParticipantList = [];
            for (const participantId of participantIds) {
                incomeParticipantList.push({
                    incomeId: addIncome.id,
                    participantId: participantId
                });
            }

            await IncomeParticipant.bulkCreate(incomeParticipantList, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });
        }
        return addIncome;
    }

    async edit(data) {
        let income = data.income;
        let labelList = data.labelList;
        let participantList = data.participantList;

        const oldIncome = await Income.find({
            where: {
                id: income.id
            }
        });

        const spread = (income.amount * 100 - oldIncome.amount * 100) / 100;
        const fundAccountService = new FundAccountService(this.transaction);
        await fundAccountService.editFundCountAmount(income.fundAccountId, 'plus', spread);

        await Income.update(income, {
            where: {
                id: income.id
            },
            transaction: this.transaction
        });

        await IncomeLabel.destroy({
            where: {
                incomeId: income.id
            },
            transaction: this.transaction,
            force: true
        });

        if (labelList.length) {
            const labelIds = _.map(data.labelList, 'id');
            const incomeLabelList = [];
            for (const labelId of labelIds) {
                incomeLabelList.push({
                    incomeId: income.id,
                    labelId: labelId
                });
            }
            await IncomeLabel.bulkCreate(incomeLabelList, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });
        }

        await IncomeParticipant.destroy({
            where: {
                incomeId: income.id
            },
            transaction: this.transaction,
            force: true
        });

        if (participantList.length) {
            const participantIds = _.map(participantList, 'id');
            const incomeParticipantList = [];
            for (const participantId of participantIds) {
                incomeParticipantList.push({
                    incomeId: income.id,
                    participantId: participantId
                });
            }

            await IncomeParticipant.bulkCreate(incomeParticipantList, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });
        }
    }

    async delete(id) {
        try {
            const income = await Income.find({
                where: {
                    id: id
                },
                raw: true,
                next: true
            });

            const fundAccount = await FundAccount.find({
                where: {
                    id: income.fundAccountId
                },
                raw: true,
                next: true
            });

            fundAccount.balance = (fundAccount.balance * 100 - income.amount * 100) / 100;

            await FundAccount.update({
                balance: fundAccount.balance
            }, {
                where: {
                    id: fundAccount.id
                },
                transaction: this.transaction
            });

            await IncomeLabel.destroy({
                where: {
                    incomeId: income.id
                },
                transaction: this.transaction,
                force: true
            });

            await IncomeParticipant.destroy({
                where: {
                    incomeId: income.id
                },
                transaction: this.transaction,
                force: true
            });

            await Income.destroy({
                where: {
                    id: income.id
                },
                transaction: this.transaction,
                force: true
            });
        } catch (error) {
            throw error;
        }
    }

    async hasIncome(data) {
        try {
            return await Income.find({
                where: {
                    userId: data.income.userId,
                    addressId: data.income.addressId,
                    incomeCategoryId: data.income.incomeCategoryId,
                    fundPartyId: data.income.fundPartyId,
                    fundChannelId: data.income.fundChannelId,
                    fundAccountId: data.income.fundAccountId,
                    $and: {
                        startDate: {
                            $lte: moment(data.income.startDate).format('YYYY-MM-DD')
                        },
                        endDate: {
                            $gte: moment(data.income.startDate).format('YYYY-MM-DD'),
                            $lte: moment(data.income.endDate).format('YYYY-MM-DD'),
                        }
                    },
                    $or: {
                        startDate: {
                            $lte: moment(data.income.endDate).format('YYYY-MM-DD'),
                        },
                        endDate: {
                            $gte: moment(data.income.endDate).format('YYYY-MM-DD'),
                            $lte: moment(data.income.startDate).format('YYYY-MM-DD'),
                        }
                    },
                    // $or: {
                    //     startDate: {
                    //         $gte: moment(data.income.startDate).format('YYYY-MM-DD'),
                    //     },
                    //     endDate: {
                    //         $lte: moment(data.income.endDate).format('YYYY-MM-DD'),
                    //     }
                    // },
                    // $or: {
                    //     startDate: {
                    //         $lte: moment(data.income.startDate).format('YYYY-MM-DD'),
                    //     },
                    //     endDate: {
                    //         $gte: moment(data.income.endDate).format('YYYY-MM-DD'),
                    //     }
                    // },
                    $and: {
                        endDate: {
                            $gte: moment(data.income.endDate).format('YYYY-MM-01'),
                            $lte: moment(data.income.endDate).endOf('month').format("YYYY-MM-DD")
                        }
                    }
                },
                raw: true,
                nest: true
            });
        } catch (error) {
            throw error;
        }
    }
}