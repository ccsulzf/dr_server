import {
    TestService
} from '../services';
import _ from "lodash";

export async function test(ctx, next) {
    let transaction = await db.sequelize.transaction({
        isolationLevel: db.sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
    });
    try {
        let testService = new TestService(transaction);
        await testService.test();
        await transaction.commit();
        ctx.body = true;
    } catch (error) {
        await transaction.rollback();
        ctx.throw(error);
    }
}