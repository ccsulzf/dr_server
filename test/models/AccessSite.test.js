import {expect} from 'chai';

describe('AccessSite Model', () => {
    describe('Create', () => {
        it('should create AccessSite success', () => {
            return AccessSite.create({
	            scenicId: 1,
	            code: '001',
	            name: '园门一',
	            seqNo: '001',
	            address: '景区门口'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create AccessSite success', () => {
			return Scenic.findAll({
				where: {id: 1},
				include: [{
					model: AccessSite
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				console.log(data[0].AccessSites);
			});
		});
	});


});
