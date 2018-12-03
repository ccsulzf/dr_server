import {expect} from 'chai';

describe('Server Model', () => {
    describe('Create', () => {
        it('should create Server success', () => {
            return Server.create({
	            scenicId: 1,
	            code: '002',
	            name: '服务器2',
	            ipAddress: '127.0.0.1'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create Server success', () => {
			return Scenic.findAll({
				where: {id: 1},
				include: [{
					model: Server
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log((data));
			});
		});
	});


});
