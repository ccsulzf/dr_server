import {expect} from 'chai';

describe('Merchant Model', () => {
    describe('Create', () => {
        it('should create Merchant success', () => {
            return Merchant.create({
	            code: 'AA001',
	            name: '思迅1',
	            businessLicense: '001',
	            email: '‎123456@163.com'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create Merchant success', () => {
			return AccessSite.findAll({
				where: {id: 1},
				include: [{
					model: Merchant
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				console.log(data[0].Merchants);
			});
		});
	});


});
