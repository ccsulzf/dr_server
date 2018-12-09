import {
    BaseDataService
} from '../services';
export async function getFundCount(ctx, next) {
    let userId = ctx.query.userId;
    ctx.body = await new BaseDataService().getFundCount(userId);
}