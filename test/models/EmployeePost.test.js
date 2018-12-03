import {expect} from 'chai';

describe('EmployeePost Model', () => {
    describe('Create', () => {
        it('should create user success', () => {
            return EmployeePost.create({
	            employeeId: 1,
	            postId: 1
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create EmployeePost success', () => {
			return Employee.findAll({
				where: {id: 1},
				include: [{
					model: Post,
					through: EmployeePost
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				console.log((data[0].Posts.EmployeePost));
			});
		});
	});
});
