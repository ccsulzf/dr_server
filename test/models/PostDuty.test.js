import {expect} from 'chai';

describe('PostDuty Model', () => {
    describe('Create', () => {
        it('should create user success', () => {
            return PostDuty.create({
	            postId: 1,
	            dutyId: 1,
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create PostDuty success', () => {
			return Post.findAll({
				where: {id: 1},
				include: [{
					model: Duty,
					through: PostDuty
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
				// console.log((data[0].dataValues));
			});
		});
	});
	describe('Find', () => {
		it('should create PostDuty success', () => {
			return PostDuty.findAll({
				where: {postId: 1},
				include: [{
					model: Post
				}],
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data.dataValues);
			});
		});
	});
	describe('FindById', () => {
		it('should create Post success', () => {
			return PostDuty.findById(1).then((data) => {
				console.log(data.dataValues);
			});
		});
	});
	describe('FindOne', () => {
		it('should create Post success', () => {
			return PostDuty.findById(1).then((data) => {
				console.log(data.dataValues);
			});
		});
	});

	describe('GetTableName', () => {
		it('should create Post success', () => {
			return PostDuty.getTableName().then((data) => {
				console.log(data.dataValues);
			});
		});
	});
});
