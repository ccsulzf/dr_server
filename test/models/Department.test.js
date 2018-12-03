import {expect} from 'chai';

describe('Department Model', () => {
    describe('Create', () => {
        it('should create Department success', () => {
            return Department.create({
	            // code: '01',
	            // name: '技术部'
	            code: '02',
	            name: '行政部'
            }).then((data) => {
	            console.log(data);
                // expect(data.name).to.equal('基本设置');
            });
        });
    });

	describe('FindAll', () => {
		it('should create Department success', () => {
			return Department.findAll().then((data) => {
				console.log(data);
			});
		});
	});
});
