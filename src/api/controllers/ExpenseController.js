import {
    ExpenseService
} from '../services';

// 添加支出
export async function addExpense(ctx, next) {
    let transaction = await db.sequelize.transaction();
    try {
        const data = ctx.request.body;
        let expenseService = new ExpenseService(transaction);
        await expenseService.addExpense(data);
        await transaction.commit();
        ctx.body = true;
    } catch (error) {
        await transaction.rollback();
        ctx.throw(error);
    }
}