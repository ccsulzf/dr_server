import {
    FundAccountService
} from './FundAccountService';
import moment from 'moment';
import * as _ from 'lodash';

export class TransferService {
    constructor(transaction) {
        this.transaction = transaction || null;
    }

    async getTransferList(transferListDate) {
        try {
            return await Transfer.findAll({
                where: {
                    transferDate: {
                        $gte: moment(transferListDate).format('YYYY-MM-01'),
                        $lte: moment(transferListDate).endOf('month').format("YYYY-MM-DD")
                    }
                },
                raw: true,
                nest: true
            })
        } catch (error) {
            throw error;
        }
    }

    async addTransfer(data) {
        try {
            let transfer = data.transfer;
            let labelList = data.labelList;


            const fundAccountService = new FundAccountService(this.transaction);
            await fundAccountService.editFundCountAmount(transfer.outFundAccountId, 'cut', transfer.amount);
            await fundAccountService.editFundCountAmount(transfer.inFundAccountId, 'plus', transfer.amount);

            const transferData = await Transfer.create(transfer, {
                transaction: this.transaction,
                raw: true,
                nest: true
            });

            transfer = transferData.dataValues;

            if (labelList.length) {
                const labelIds = _.map(labelList, 'id');
                const transferLabelList = [];
                for (const labelId of labelIds) {
                    transferLabelList.push({
                        transferId: transfer.id,
                        labelId: labelId
                    });
                }
                await TransferLabel.bulkCreate(transferLabelList, {
                    transaction: this.transaction,
                    raw: true,
                    nest: true
                });
            }
            return transfer;
        } catch (error) {
            throw error;
        }
    }
}