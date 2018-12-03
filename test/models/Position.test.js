import {expect} from 'chai';

describe('Position Model', () => {
    describe('Create', () => {
        it('should create Position success', () => {
            return Position.create({
	            code: '001',
	            name: '研发工程师'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create Position success', () => {
			return Position.findAll({
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
			});
		});
	});
});
