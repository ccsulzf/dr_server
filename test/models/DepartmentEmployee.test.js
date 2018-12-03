import {expect} from 'chai';

describe('DepartmentEmployee Model', () => {
    describe('Create', () => {
        it('should create user success', () => {
            return DepartmentEmployee.create({
	            employeeId: 1,
	            departmentId: 1
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create DepartmentEmployee success', () => {
			return Department.findAll({
				where: {id: 1},
				include: [{
					model: Employee,
					through: DepartmentEmployee
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				console.log((data[0].Employees.DepartmentEmployee));
			});
		});
	});
	
});
