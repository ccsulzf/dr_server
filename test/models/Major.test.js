import {expect} from 'chai';

describe('Major Model', () => {
    describe('Create', () => {
        it('should create Major success', () => {
            return Major.create({
	            code: '001',
	            name: '软件工程'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create Major success', () => {
			return Major.findAll({
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
			});
		});
	});
});
