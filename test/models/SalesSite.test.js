import {expect} from 'chai';

describe('SalesSite Model', () => {
    describe('Create', () => {
        it('should create SalesSite success', () => {
            return SalesSite.create({
	            scenicId: 1,
	            code: '001',
	            name: '站点一',
	            address: '景区'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create SalesSite success', () => {
			return Scenic.findAll({
				where: {id: 1},
				include: [{
					model: SalesSite
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				console.log(data[0].SalesSites);
			});
		});
	});


});
