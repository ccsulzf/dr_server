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

            let outAmount = (transfer.amount * 100 + transfer.handleFee * 100) / 100;
            await fundAccountService.editFundCountAmount(transfer.outFundAccountId, 'cut', outAmount);

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

    async editTransfer(data) {
        let transfer = data.transfer;
        let labelList = data.labelList;
        let oldTransfer = await Transfer.find({
            where: {
                id: transfer.id
            },
            raw: true,
            next: true
        });
        let old_out_account = await FundAccount.find({
            where: {
                id: oldTransfer.outFundAccountId
            },
            raw: true,
            next: true
        });
        let old_in_account = await FundAccount.find({
            where: {
                id: oldTransfer.inFundAccountId
            },
            raw: true,
            next: true
        });
        try {
            let newOutAccountId = transfer.outFundAccountId;
            let newInAccountId = transfer.inFundAccountId;

            let oldTransfer = await Transfer.find({
                where: {
                    id: transfer.id
                }
            });

            let oldOutAccountId = oldTransfer.outFundAccountId;
            let oldInAccountId = oldTransfer.inFundAccountId;

            const fundAccountService = new FundAccountService();

            //  手续费和转账金额退给以前的转出账户（以前的转出账户要加上转账金额+手续费）
            let oldReturnAmount = (oldTransfer.amount * 100 + oldTransfer.handleFee * 100) / 100;
            await fundAccountService.editFundCountAmount(oldOutAccountId, 'plus', oldReturnAmount);
            // 以前的转入账户要减去转账金额
            await fundAccountService.editFundCountAmount(oldInAccountId, 'cut', oldTransfer.amount);
            // 新的转出账户减去手续费和余额

            let newOutAmount = (transfer.amount * 100 + transfer.handleFee * 100) / 100;
            await fundAccountService.editFundCountAmount(newOutAccountId, 'cut', newOutAmount);

            await fundAccountService.editFundCountAmount(newInAccountId, 'plus', transfer.amount);

            await Transfer.update(transfer, {
                where: {
                    id: transfer.id
                },
                transaction: this.transaction
            });
        } catch (error) {
            // 账户没有事务了，如果错了，只能手动还原
            await FundAccount.update(old_out_account, {
                where: {
                    id: old_out_account.id
                }
            });
            await FundAccount.update(old_in_account, {
                where: {
                    id: old_in_account.id
                }
            });
            throw error;
        }
    }

}