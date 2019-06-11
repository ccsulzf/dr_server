import {
    TransferService
} from '../services';

export async function addTransfer(ctx, next) {
    let transaction = await db.sequelize.transaction();
    try {
        const data = ctx.request.body;
        let transferService = new TransferService(transaction);
        const transfer = await transferService.addTransfer(data);
        await transaction.commit();
        ctx.body = transfer;
    } catch (error) {
        await transaction.rollback();
        ctx.throw(error);
    }
}

export async function editTransfer(ctx, next) {
    let transaction = await db.sequelize.transaction();
    try {
        const data = ctx.request.body;
        let transferService = new TransferService(transaction);
        const transfer = await transferService.editTransfer(data);
        await transaction.commit();
        ctx.body = true;
    } catch (error) {
        await transaction.rollback();
        ctx.throw(error);
    }
}


export async function getTransferList(ctx, next) {
    try {
        const transferListDate = ctx.query.transferListDate;
        ctx.body = await new TransferService().getTransferList(transferListDate);
    } catch (error) {
        ctx.throw(error);
    }
}