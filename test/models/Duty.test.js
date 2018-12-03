import {expect} from 'chai';

describe('Duty Model', () => {
    describe('Create', () => {
        it('should create Duty success', () => {
            return Duty.create({
	            // code: '01',
	            // name: 'BasicSettings',
	            // showName: '基本设置',
	            // gotoPage: '/BasicSettings'
	            code: '02',
	            name: 'DecisionSupport',
	            showName: '决策支持',
	            gotoPage: '/DecisionSupport'
            }).then((data) => {
	            console.log(data);
                // expect(data.name).to.equal('基本设置');
            });
        });
    });

	describe('FindAll', () => {
		it('should create Duty success', () => {
			return Duty.find({
				where: {id: 2}
			}).then((data) => {
				if(data.dataValues){
					let code = data.dataValues.code + "%";
					let parentCode = data.dataValues.code.substring(0, data.dataValues.code.length - 2);
					Duty.finAll({
						where: {
							$like: [
								{code: code},
								{$or: {code: parentCode}}
							]
						}
					}).then((data) => {
						console.info(data);
					})
				}else{

				}
			})
		});
	});


});
