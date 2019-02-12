import {
    BaseDataService
} from '../services';


export async function getFundCount(ctx, next) {
    let userId = ctx.query.userId;
    ctx.body = await new BaseDataService().getFundCount(userId);
}

export async function addFundCount(ctx, next) {
    const fundAccount = ctx.request.body.fundAccount;
    const creditAccount = ctx.request.body.creditAccount;
    let transaction = await db.sequelize.transaction();
    let baseDataService = new BaseDataService(transaction);
    try {
        ctx.body = await baseDataService.addFundCount(fundAccount, creditAccount);
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        ctx.throw(err);
    }
}

export async function addLabel(ctx, next) {
    const label = ctx.request.body;
    try {
        const baseDataService = new BaseDataService();
        ctx.body = await baseDataService.addLabel(label);
    } catch (err) {
        ctx.throw(err);
    }
}