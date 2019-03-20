import {
    ExpenseDetailReportService
} from '../services/ExpenseDetailReportService';
// 获取ExpenseCategroy
export async function getDetail(ctx, next) {
    try {
        const option = ctx.request.body;
        let expenseDetailReportService = new ExpenseDetailReportService();
        ctx.body = await expenseDetailReportService.getDetail(option);
        // ctx.body = true;
    } catch (error) {
        ctx.throw(error);
    }
}