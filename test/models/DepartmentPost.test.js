import {expect} from 'chai';

describe('DepartmentPost Model', () => {
    describe('Create', () => {
        it('should create user success', () => {
            return DepartmentPost.create({
	            postId: 2,
	            departmentId: 2
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create DepartmentPost success', () => {
			return Department.findAll({
				where: {id: 1},
				include: [{
					model: Post,
					through: DepartmentPost
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				console.log((data[0].Posts.DepartmentPost));
			});
		});
	});
});
