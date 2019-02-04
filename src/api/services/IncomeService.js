import moment from 'moment';

export class IncomeService {
    constructor(transaction) {
        this.transaction = transaction || null;
    }

    async add(data) {
        try {
            let hasIncome;
            hasIncome = await Income.find({
                where: {
                    userId: data.income.userId,
                    addressId: data.income.addressId,
                    incomeCategoryId: data.income.incomeCategoryId,
                    fundPartyId: data.income.fundPartyId,
                    fundWayId: data.income.fundWayId,
                    fundAccountId: data.income.fundAccountId,
                    endDate: {
                        $gte: moment(data.income.endDate).format('YYYY-MM-DD'),
                        $lte: moment(data.income.endDate).format('YYYY-MM-DD')
                    },
                    $and: {
                        endDate: {
                            $gte: moment(data.income.endDate).format('YYYY-MM-01'),
                            $lte: moment(data.income.endDate).endOf('month').format("YYYY-MM-DD")
                        }
                    }
                }
            });

            if (hasIncome) {
                // 改变日期 --- 选择最小的[hasIncome.startDate,data.income.startDate]
                //         --- 选择最大的[hasIncome.endDate,data.income.endDate]  
                // 改变金额
                
            } else {
                // 新增
                // +fundAccount

            }
        } catch (error) {
            throw error;
        }
    }
}