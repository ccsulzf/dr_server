import {expect} from 'chai';

describe('Employee Model', () => {
    describe('Create', () => {
        it('should create Employee success', () => {
            return Employee.create({
	            code: '001',
	            name: '黄致列',
	            cardId: '430151198808285125',
	            nationId: 1,
	            majorId: 1,
	            nativePlaceId: 1,
	            professionalId: 1,
	            educationalId: 1,
	            positionId: 1
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create Employee success', () => {
			return Employee.findAll({
				where: {id: 1},
				include: [Nation, NativePlace, Professional, Educational, Position, Major],
				raw: true,
				nest: true
			}).then((data) => {
				console.log(data);
			});
		});
	});
});
