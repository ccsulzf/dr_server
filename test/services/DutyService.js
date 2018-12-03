/**
 * Created by wp on 2016-12-12.
 */
import {expect} from 'chai';
import supertest from 'supertest';

const request = supertest.agent(app.listen());

describe('Duty Service', () => {
	describe('GET', () => {
		it('should get duty success', () => {
			return User.create({
				name: 'roas',
				nickname: 'roas.js'
			}).then(async(user) => {
				expect(user.nickname).to.equal('roas.js');
				const dutyService = new DutyService();
				let duty = await dutyService.getDepartmentId(1);
				expect(duty.nickname).to.equal('roas.js');
			});
		});
	});
});