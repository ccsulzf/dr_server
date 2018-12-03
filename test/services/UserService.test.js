import app from '../../src/app.js';
import {expect} from 'chai';
import supertest from 'supertest';

const request = supertest.agent(app.listen());

describe('User Service', () => {
    describe('GET', () => {
        it('should get user success', () => {
            return User.create({
                name: 'roas',
                nickname: 'roas.js',
            }).then(async(user) => {
                expect(user.nickname).to.equal('roas.js');

                const userService = new UserService();
                user = await userService.getUser(1);
                expect(user.nickname).to.equal('roas.js');
            });
        });
    });
});

