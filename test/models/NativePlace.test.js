import {expect} from 'chai';

describe('NativePlace Model', () => {
    describe('Create', () => {
        it('should create NativePlace success', () => {
            return NativePlace.create({
	            code: '001',
	            name: '湖南省'
            }).then((data) => {
	            console.log(data);
            });
        });
    });

	describe('FindAll', () => {
		it('should create NativePlace success', () => {
			return NativePlace.findAll({
				raw: true,
				nest:true
			}).then((data) => {
				console.log(data);
			});
		});
	});
});
