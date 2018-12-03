import {expect} from 'chai';

describe('Professional Model', () => {
    describe('Create', () => {
        it('should create Professional success', () => {
            return Professional.create({
	            code: '001',
	            name: '高级工程师'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create Professional success', () => {
			return Professional.findAll({
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
			});
		});
	});
});
