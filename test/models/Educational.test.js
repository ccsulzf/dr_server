import {expect} from 'chai';

describe('Educational Model', () => {
    describe('Create', () => {
        it('should create Educational success', () => {
            return Educational.create({
	            code: '001',
	            name: '本科'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create Educational success', () => {
			return Educational.findAll({
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
			});
		});
	});
});
