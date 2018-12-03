import {expect} from 'chai';

describe('EmployeeDuty Model', () => {
    describe('Create', () => {
        it('should create user success', () => {
            return EmployeeDuty.create({
	            employeeId: 1,
	            dutyId: 1,
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create EmployeeDuty success', () => {
			return Employee.findAll({
				where: {id: 1},
				include: [{
					model: Duty,
					through: EmployeeDuty
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				// console.log((data[0].dataValues));
			});
		});
	});
});
