import {
    IncomeService
} from '../services';

// 添加收入
export async function addIncome(ctx, next) {
    let transaction = await db.sequelize.transaction();
    try {
        const data = ctx.request.body;
        let incomeService = new IncomeService(transaction);
        const incomeDetailId = await incomeService.add(data);
        await transaction.commit();
        ctx.body = incomeDetailId;
    } catch (error) {
        await transaction.rollback();
        ctx.throw(error);
    }
}

// 获取收入list
export async function getIncomeList(ctx, next) {
    try {
        const incomeListDate = ctx.query.incomeListDate;
        ctx.body = await new IncomeService().getIncomeList(incomeListDate);
    } catch (error) {
        ctx.throw(error);
    }
}