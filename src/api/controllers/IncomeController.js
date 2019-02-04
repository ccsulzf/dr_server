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