import {expect} from 'chai';

describe('EquipCompose Model', () => {
    describe('Create', () => {
        it('should create EquipCompose success', () => {
            return EquipCompose.create({
	            equipId: 1,
	            equipSubId: 1
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create EquipCompose success', () => {
			return Equip.findAll({
				where: {id: 1},
				include: [{model: EquipCompose}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				console.log(data[0].EquipComposes);
			});
		});
	});


});
