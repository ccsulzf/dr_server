import {expect} from 'chai';

describe('Nation Model', () => {
    describe('Create', () => {
        it('should create Nation success', () => {
            return Nation.create({
	            code: '001',
	            name: '汉族'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create Nation success', () => {
			return Nation.findAll({
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
			});
		});
	});
});
