import {expect} from 'chai';

describe('SalesWin Model', () => {
    describe('Create', () => {
        it('should create SalesWin success', () => {
            return SalesWin.create({
	            salesSiteId: 1,
	            code: '002',
	            name: '窗口1',
	            ipAddress: '127.0.0.1',
	            seqNo: '001',
	            macAddress: '38-2C-4A-6F-4B-01'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create SalesWin success', () => {
			return SalesSite.findAll({
				where: {id: 1},
				include: [{
					model: SalesWin
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				console.log(data[0].SalesWins);
			});
		});
	});


});
