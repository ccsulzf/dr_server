import {expect} from 'chai';

describe('Equip Model', () => {
    describe('Create', () => {
        it('should create Equip success', () => {
            return Equip.create({
	            model: '001',
	            name: '闸机'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create Equip success', () => {
			return Equip.findAll({
				where: {id: 1},
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
			});
		});
	});


});
