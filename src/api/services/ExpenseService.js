export class ExpenseService {
    constructor(transaction) {
        this.transaction = transaction || null;
    }

    async addExpense(data) {
        try {
            const expenseData = await Expense.create(data.expense, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });
            const expense = expenseData.dataValues;

            data.expenseDetail.expenseId = expense.id;
            const expenseDetailData = await ExpenseDetail.create(data.expenseDetail, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });
            const expenseDetail = expenseDetailData.dataValues;

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
        } catch (error) {
            throw error;
        }
    }
}