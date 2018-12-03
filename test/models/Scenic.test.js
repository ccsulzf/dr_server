import {expect} from 'chai';

describe('Scenic Model', () => {
    describe('Create', () => {
        it('should create Scenic success', () => {
            return Scenic.create({
	            code: '001',
	            name: '东江湖',
	            address: '湖南郴州'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create Scenic success', () => {
			return Scenic.findAll({
				where: {
					productId: 1
				},
				include: [{
					model: Product
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log((data));
			});
		});
	});


});
