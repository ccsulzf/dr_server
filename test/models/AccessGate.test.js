import {expect} from 'chai';

describe('AccessGate Model', () => {
    describe('Create', () => {
        it('should create AccessGate success', () => {
            return AccessGate.create({
	            accessSiteId: 1,
	            equipId: 1,
	            code: '001',
	            name: '通道一',
	            seqNo: '001',
	            macAddress: '38-2C-4A-6F-4B-01',
	            ipAddress: '127.0.0.1'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create AccessGate success', () => {
			return AccessSite.findAll({
				where: {id: 1},
				include: [{
					model: AccessGate
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				console.log(data[0].AccessGates);
			});
		});
	});


});
