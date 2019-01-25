export class ExpenseService {
    constructor(transaction) {
        this.transaction = transaction || null;
    }

    async addExpense(data) {
        try {
            let hasExpense;
            let expenseData;
            let expense;

            hasExpense = await Expense.find({
                where: {
                    expenseBookId: data.expense.expenseBookId,
                    userId: data.expense.userId,
                    expenseDate: data.expense.expenseDate
                }
            });

            if (hasExpense) {
                hasExpense.totalAmount += data.expense.totalAmount;
                await Expense.update({
                    totalAmount: hasExpense.totalAmount
                }, {
                    where: {
                        id: hasExpense.id
                    },
                    transaction: this.transaction
                })
            } else {
                expenseData = await Expense.create(data.expense, {
                    transaction: this.transaction,
                    raw: true,
                    nest: true
                });
                expense = expenseData.dataValues;
            }

            data.expenseDetail.expenseId = hasExpense ? hasExpense.id : expense.id;
            const expenseDetailData = await ExpenseDetail.create(data.expenseDetail, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });
            const expenseDetail = expenseDetailData.dataValues;

            // 处理付款账户
            const fundAccount = await FundAccount.find({
                where: {
                    id: data.expenseDetail.fundAccountId
                },
                raw: true,
                nest: true
            });

            fundAccount.balance = (fundAccount.balance * 100 - data.expenseDetail.amount * 100) / 100;
            await FundAccount.update({
                balance: fundAccount.balance
            }, {
                where: {
                    id: fundAccount.id
                },
                transaction: this.transaction
            });
            // 如果是信贷用户
            if (fundAccount.isCredit == 1) {
                const creditAccount = await CreditAccount.find({
                    where: {
                        fundAccountId: fundAccount.id
                    },
                    raw: true,
                    nest: true
                });
                creditAccount.usedAmount = (creditAccount.usedAmount * 100 + data.expenseDetail.amount * 100) / 100;
                await CreditAccount.update({
                    usedAmount: creditAccount.usedAmount
                }, {
                    where: {
                        id: creditAccount.id
                    },
                    transaction: this.transaction
                });
            }

            if (data.labelList && data.labelList.length) {
                let expenseDetailLabelList = [];
                for (let item of data.labelList) {
                    expenseDetailLabelList.push({
                        labelId: item.id,
                        expenseDetailId: expenseDetail.id
                    });
                }
                await ExpenseDetailLabel.bulkCreate(expenseDetailLabelList, {
                    transaction: this.transaction,
                    raw: true,
                    nest: true
                });
            }

            if (data.participantList && data.participantList.length) {
                let expenseDetailParticipantList = [];
                for (let item of data.participantList) {
                    expenseDetailParticipantList.push({
                        participantId: item.id,
                        expenseDetailId: expenseDetail.id
                    });
                }
                await ExpenseDetailParticipant.bulkCreate(expenseDetailParticipantList, {
                    transaction: this.transaction,
                    raw: true,
                    nest: true
                });
            }

            return {
                expenseId: data.expenseDetail.expenseId,
                expenseDetail: expenseDetail
            };
        } catch (error) {
            throw error;
        }
    }


    async editExpense(data) {
        try {
            const prevExpenseDetail = await ExpenseDetail.find({
                where: {
                    id: data.expenseDetail.id
                },
                raw: true,
                nest: true
            });

            const spread = (prevExpenseDetail.amount * 100 - data.expenseDetail.amount * 100) / 100;

            const oldExpense = await Expense.find({
                where: {
                    id: data.expense.id
                },
                raw: true,
                nest: true
            });


            if ((oldExpense.expenseBookId === data.expense.expenseBookId) &&
                (oldExpense.expenseDate === data.expense.expenseDate)) {
                // 如果什么都相等,直接更新就好了
                data.expense.totalAmount = (data.expense.totalAmount * 100 - (spread * 100)) / 100;
                await Expense.update(data.expense, {
                    where: {
                        id: data.expense.id
                    },
                    transaction: this.transaction,
                });
            } else {
                // 如果账本相等,但是日期不相等,则找到该日期的expense数据

                // 先把之前的expense数据平掉
                oldExpense.totalAmount = (oldExpense.totalAmount * 100 - data.expenseDetail.amount * 100) / 100;

                if (oldExpense.totalAmount > 0) {
                    await Expense.update({
                        totalAmount: oldExpense.totalAmount
                    }, {
                        where: {
                            id: oldExpense.id
                        },
                        transaction: this.transaction,
                    });
                } else {
                    await Expense.destroy({
                        where: {
                            id: oldExpense.id
                        },
                        transaction: this.transaction,
                        force: true
                    });
                }

                // 再找有没有相同的日期或者相同账本的信息
                const findExpense = await Expense.find({
                    where: {
                        expenseDate: data.expense.expenseDate,
                        expenseBookId: data.expense.expenseBookId
                    },
                    raw: true,
                    nest: true
                });

                if (findExpense) {
                    // 更新
                    findExpense.totalAmount = (findExpense.totalAmount * 100 + data.expenseDetail.amount * 100) / 100;
                    await Expense.update({
                        totalAmount: findExpense.totalAmount
                    }, {
                        where: {
                            id: findExpense.id
                        },
                        transaction: this.transaction,
                    });
                    data.expenseDetail.expenseId = findExpense.id;
                } else {
                    // 新增
                    delete data.expense.id;
                    const expenseData = await Expense.create(data.expense, {
                        transaction: this.transaction,
                        raw: true,
                        nest: true
                    });
                    const createExpense = expenseData.dataValues;
                    data.expenseDetail.expenseId = createExpense.id;
                }
            }

            await ExpenseDetail.update(data.expenseDetail, {
                where: {
                    id: data.expenseDetail.id
                },
                transaction: this.transaction,
            });

            const nowfundAccount = await FundAccount.find({
                where: {
                    id: data.expenseDetail.fundAccountId
                },
                raw: true,
                nest: true
            });

            const prevFundAccount = await FundAccount.find({
                where: {
                    id: prevExpenseDetail.fundAccountId
                },
                raw: true,
                nest: true
            });

            // 对账户进行改变
            if (nowfundAccount.id == prevFundAccount.id) {
                // 如果账户没有改变
                nowfundAccount.balance = (nowfundAccount.balance * 100 + (spread * 100)) / 100;

                await FundAccount.update({
                    balance: nowfundAccount.balance
                }, {
                    where: {
                        id: nowfundAccount.id
                    },
                    raw: true,
                    nest: true,
                    transaction: this.transaction
                });

                if (nowfundAccount.isCredit == 1) {
                    const creditAccount = await CreditAccount.find({
                        where: {
                            fundAccountId: nowfundAccount.id
                        },
                        raw: true,
                        nest: true
                    });
                    creditAccount.usedAmount = (creditAccount.usedAmount * 100 + (spread * 100)) / 100;
                    await CreditAccount.update({
                        usedAmount: creditAccount.usedAmount
                    }, {
                        where: {
                            id: creditAccount.id
                        },
                        transaction: this.transaction
                    });
                }
            } else {
                // 如果改变了,则先平掉之前的,再改变新的
                prevFundAccount.balance = (prevFundAccount.balance * 100 + (prevExpenseDetail.amount * 100)) / 100;
                await FundAccount.update({
                    balance: prevFundAccount.balance
                }, {
                    where: {
                        id: prevFundAccount.id
                    },
                    raw: true,
                    nest: true,
                    transaction: this.transaction
                });

                if (prevFundAccount.isCredit == 1) {
                    const creditAccount = await CreditAccount.find({
                        where: {
                            fundAccountId: prevFundAccount.id
                        },
                        raw: true,
                        nest: true
                    });
                    creditAccount.usedAmount = (creditAccount.usedAmount * 100 + (prevExpenseDetail.amount * 100)) / 100;

                    await CreditAccount.update({
                        usedAmount: creditAccount.usedAmount
                    }, {
                        where: {
                            id: creditAccount.id
                        },
                        transaction: this.transaction
                    });
                }


                nowfundAccount.balance = (nowfundAccount.balance * 100 - (data.expenseDetail.amount * 100)) / 100;

                await FundAccount.update({
                    balance: nowfundAccount.balance
                }, {
                    where: {
                        id: nowfundAccount.id
                    },
                    raw: true,
                    nest: true,
                    transaction: this.transaction
                });

                if (nowfundAccount.isCredit == 1) {
                    const creditAccount = await CreditAccount.find({
                        where: {
                            fundAccountId: nowfundAccount.id
                        },
                        raw: true,
                        nest: true
                    });
                    creditAccount.usedAmount = (creditAccount.usedAmount * 100 - (data.expenseDetail.amount * 100)) / 100;

                    await CreditAccount.update({
                        usedAmount: creditAccount.usedAmount
                    }, {
                        where: {
                            id: creditAccount.id
                        },
                        transaction: this.transaction
                    });
                }

            }

            if (data.labelList && data.labelList.length) {
                let expenseDetailLabelList = [];
                for (let item of data.labelList) {
                    expenseDetailLabelList.push({
                        labelId: item.id,
                        expenseDetailId: data.expenseDetail.id
                    });
                }

                await ExpenseDetailLabel.destroy({
                    where: {
                        expenseDetailId: prevExpenseDetail.id
                    },
                    transaction: this.transaction,
                    force: true
                });

                await ExpenseDetailLabel.bulkCreate(expenseDetailLabelList, {
                    transaction: this.transaction,
                    raw: true,
                    nest: true
                });
            }


            if (data.participantList && data.participantList.length) {
                let expenseDetailParticipantList = [];
                for (let item of data.participantList) {
                    expenseDetailParticipantList.push({
                        participantId: item.id,
                        expenseDetailId: data.expenseDetail.id
                    });
                }

                await ExpenseDetailParticipant.destroy({
                    where: {
                        expenseDetailId: prevExpenseDetail.id
                    },
                    transaction: this.transaction,
                    force: true
                });

                await ExpenseDetailParticipant.bulkCreate(expenseDetailParticipantList, {
                    transaction: this.transaction,
                    raw: true,
                    nest: true
                });
            }

            return prevExpenseDetail;
        } catch (error) {
            throw error;
        }
    }


    async delExpense(expenseDetailId) {
        try {
            const expenseDetail = await ExpenseDetail.find({
                where: {
                    id: expenseDetailId
                },
                raw: true,
                nest: true
            });

            const expense = await Expense.find({
                where: {
                    id: expenseDetail.expenseId
                },
                raw: true,
                nest: true
            });

            // 删除相关的参与人
            await ExpenseDetailParticipant.destroy({
                where: {
                    expenseDetailId: expenseDetailId
                },
                transaction: this.transaction,
                force: true
            });

            // 删除相关的标签
            await ExpenseDetailLabel.destroy({
                where: {
                    expenseDetailId: expenseDetailId
                },
                transaction: this.transaction,
                force: true
            });

            // 删除明细
            await ExpenseDetail.destroy({
                where: {
                    id: expenseDetailId
                },
                transaction: this.transaction,
                force: true
            });


            // 处理支出,如果只有一条,则也删除expense,否则就更新
            const spread = (expense.totalAmount * 100 - expenseDetail.amount * 100) / 100;
            if (spread === 0) {
                await Expense.destroy({
                    where: {
                        id: expense.id
                    },
                    transaction: this.transaction,
                    force: true
                })
            } else {
                await Expense.update({
                    totalAmount: spread
                }, {
                    where: {
                        id: expense.id
                    },
                    transaction: this.transaction
                });
            }

            const fundAccount = await FundAccount.find({
                where: {
                    id: expenseDetail.fundAccountId
                }
            });

            // FundAccount balance+
            // CreditAccount usedAmount-

            fundAccount.balance = (fundAccount.balance * 100 + expenseDetail.amount * 100) / 100;

            await FundAccount.update({
                balance: fundAccount.balance
            }, {
                where: {
                    id: fundAccount.id
                },
                transaction: this.transaction
            })

            if (fundAccount.isCredit) {
                const creditAccount = await CreditAccount.find({
                    where: {
                        fundAccountId: fundAccount.id
                    }
                });

                creditAccount.usedAmount = (creditAccount.usedAmount * 100 - expenseDetail.amount * 100) / 100;
                await CreditAccount.update({
                    usedAmount: creditAccount.usedAmount
                }, {
                    where: {
                        id: creditAccount.id
                    },
                    transaction: this.transaction
                });
            }
        } catch (error) {
            throw error;
        }
    }
}