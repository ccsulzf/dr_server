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
        try {
            const hasIncome = await this.hasIncome(data);
            if (hasIncome) {
                // 改变日期 --- 选择最小的[hasIncome.startDate,data.income.startDate]
                //         --- 选择最大的[hasIncome.endDate,data.income.endDate]  
                // 改变金额
                hasIncome.startDate = moment(data.income.startDate).isBefore(hasIncome.startDate) ? data.income.startDate : hasIncome.startDate;

                hasIncome.endDate = moment(data.income.endDate).isBefore(hasIncome.endDate) ? hasIncome.endDate : data.income.endDate;

                hasIncome.amount = (hasIncome.amount * 100 + data.income.amount * 100) / 100;
                await Income.update(hasIncome, {
                    where: {
                        id: hasIncome.id
                    },
                    transaction: this.transaction
                });

                // label
                if (data.labelList.length) {
                    const hasIncomeLabelList = await IncomeLabel.findAll({
                        where: {
                            incomeId: hasIncome.id
                        },
                        raw: true,
                        nest: true
                    });

                    const labelIds = _.union(_.map(hasIncomeLabelList, 'labelId'), _.map(data.labelList, 'id'));

                    const incomeLabelList = [];
                    for (const labelId of labelIds) {
                        incomeLabelList.push({
                            incomeId: hasIncome.id,
                            labelId: labelId
                        });
                    }

                    await IncomeLabel.destroy({
                        where: {
                            incomeId: hasIncome.id
                        },
                        transaction: this.transaction,
                        force: true
                    });

                    await IncomeLabel.bulkCreate(incomeLabelList, {
                        transaction: this.transaction,
                        raw: true,
                        nest: true
                    });
                }

                // participant
                if (data.participantList.length) {
                    const hasIncomeParticipantList = await IncomeParticipant.findAll({
                        where: {
                            incomeId: hasIncome.id
                        },
                        raw: true,
                        nest: true
                    });
                    const participantIds = _.union(_.map(hasIncomeParticipantList, 'participantId'), _.map(data.participantList, 'id'));
                    const incomeParticipantList = [];
                    for (const participantId of participantIds) {
                        incomeParticipantList.push({
                            incomeId: hasIncome.id,
                            participantId: participantId
                        });
                    }

                    await IncomeParticipant.destroy({
                        where: {
                            incomeId: hasIncome.id
                        },
                        transaction: this.transaction,
                        force: true
                    });

                    await IncomeParticipant.bulkCreate(incomeParticipantList, {
                        transaction: this.transaction,
                        raw: true,
                        nest: true
                    });
                }

                return hasIncome.id;
            } else {
                // 新增
                // +fundAccount
                // labelList
                // participantList
                const incomeData = await Income.create(data.income, {
                    transaction: this.transaction,
                    raw: true,
                    nest: true
                });
                const income = incomeData.dataValues;

                // 处理付款账户
                const fundAccount = await FundAccount.find({
                    where: {
                        id: data.income.fundAccountId
                    },
                    raw: true,
                    nest: true
                });

                fundAccount.balance = (fundAccount.balance * 100 + data.income.amount * 100) / 100;

                await FundAccount.update({
                    balance: fundAccount.balance
                }, {
                    where: {
                        id: fundAccount.id
                    },
                    transaction: this.transaction
                });

                if (data.labelList && data.labelList.length) {
                    let incomeLabelList = [];
                    for (let item of data.labelList) {
                        incomeLabelList.push({
                            labelId: item.id,
                            incomeId: income.id
                        });
                    }
                    await IncomeLabel.bulkCreate(incomeLabelList, {
                        transaction: this.transaction,
                        raw: true,
                        nest: true
                    });
                }

                if (data.participantList && data.participantList.length) {
                    let incomeParticipantList = [];
                    for (let item of data.participantList) {
                        incomeParticipantList.push({
                            participantId: item.id,
                            incomeId: income.id
                        });
                    }
                    await IncomeParticipant.bulkCreate(incomeParticipantList, {
                        transaction: this.transaction,
                        raw: true,
                        nest: true
                    });
                }

                return income.id;
            }
        } catch (error) {
            throw error;
        }
    }

    async edit(data) {
        try {
            // 如果有就把以前的删除，和增加差不多
            const hasIncome = await this.hasIncome(data);
            const oldIncome = await Income.find({
                where: {
                    id: data.income.id
                },
                raw: true,
                next: true
            });

            // 现在的减去以前的
            const diffAmount = (data.income.amount * 100 - oldIncome.amount * 100) / 100;

            // 更新fundAccount
            const fundAccount = await FundAccount.find({
                where: {
                    id: data.income.fundAccountId
                },
                raw: true,
                next: true
            });

            fundAccount.balance = (fundAccount.balance * 100 + diffAmount * 100) / 100;

            await FundAccount.update(fundAccount, {
                where: {
                    id: fundAccount.id
                },
                transaction: this.transaction,
            });

            if (hasIncome && (hasIncome.id !== data.income.id)) {
                // 更新hasIncome 时间和金额
                // 更新label，participant
                // 改变金额 时间
                // 删掉以前的Income
                hasIncome.startDate = moment(data.income.startDate).isBefore(hasIncome.startDate) ? data.income.startDate : hasIncome.startDate;

                hasIncome.endDate = moment(data.income.endDate).isBefore(hasIncome.endDate) ? hasIncome.endDate : data.income.endDate;

                hasIncome.amount = (hasIncome.amount * 100 + data.income.amount * 100) / 100;

                await Income.destroy({
                    where: {
                        id: data.income.id
                    },
                    transaction: this.transaction,
                    force: true
                });

                await Income.update(hasIncome, {
                    where: {
                        id: hasIncome.id
                    },
                    transaction: this.transaction
                });

                // label
                if (data.labelList.length) {
                    const hasIncomeLabelList = await IncomeLabel.findAll({
                        where: {
                            incomeId: hasIncome.id
                        },
                        raw: true,
                        nest: true
                    });

                    const labelIds = _.union(_.map(hasIncomeLabelList, 'labelId'), _.map(data.labelList, 'id'));

                    const incomeLabelList = [];
                    for (const labelId of labelIds) {
                        incomeLabelList.push({
                            incomeId: hasIncome.id,
                            labelId: labelId
                        });
                    }

                    await IncomeLabel.destroy({
                        where: {
                            incomeId: hasIncome.id
                        },
                        transaction: this.transaction,
                        force: true
                    });

                    await IncomeLabel.bulkCreate(incomeLabelList, {
                        transaction: this.transaction,
                        raw: true,
                        nest: true
                    });
                }

                // participant
                if (data.participantList.length) {
                    const hasIncomeParticipantList = await IncomeParticipant.findAll({
                        where: {
                            incomeId: hasIncome.id
                        },
                        raw: true,
                        nest: true
                    });
                    const participantIds = _.union(_.map(hasIncomeParticipantList, 'participantId'), _.map(data.participantList, 'id'));
                    const incomeParticipantList = [];
                    for (const participantId of participantIds) {
                        incomeParticipantList.push({
                            incomeId: hasIncome.id,
                            participantId: participantId
                        });
                    }

                    await IncomeParticipant.destroy({
                        where: {
                            incomeId: hasIncome.id
                        },
                        transaction: this.transaction,
                        force: true
                    });

                    await IncomeParticipant.bulkCreate(incomeParticipantList, {
                        transaction: this.transaction,
                        raw: true,
                        nest: true
                    });
                }



                return hasIncome.id;
            } else {
                // 更新
                await Income.update(data.income, {
                    where: {
                        id: data.income.id
                    },
                    transaction: this.transaction
                });

                // 删掉label，新增label
                await IncomeLabel.destroy({
                    where: {
                        incomeId: data.income.id
                    },
                    transaction: this.transaction,
                    force: true
                });
                if (data.labelList && data.labelList.length) {
                    let incomeLabelList = [];
                    for (let item of data.labelList) {
                        incomeLabelList.push({
                            labelId: item.id,
                            incomeId: data.income.id
                        });
                    }
                    await IncomeLabel.bulkCreate(incomeLabelList, {
                        transaction: this.transaction,
                        raw: true,
                        nest: true
                    });
                }

                // 删掉Participant，新增Participant
                await IncomeParticipant.destroy({
                    where: {
                        incomeId: data.income.id
                    },
                    transaction: this.transaction,
                    force: true
                });
                if (data.participantList && data.participantList.length) {
                    let incomeParticipantList = [];
                    for (let item of data.participantList) {
                        incomeParticipantList.push({
                            participantId: item.id,
                            incomeId: data.income.id
                        });
                    }
                    await IncomeParticipant.bulkCreate(incomeParticipantList, {
                        transaction: this.transaction,
                        raw: true,
                        nest: true
                    });
                }
                return data.income.id;
            }
        } catch (error) {
            throw error;
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
                    fundWayId: data.income.fundWayId,
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