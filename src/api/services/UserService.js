/**
 * Created by wp on 2017-01-05.
 */
export class UserService {
    constructor(transaction) {
        this.transaction = transaction || null;
    }

    async login(nameOrEmali, password) {
        let data = await user.find({
            where: {
                $or: [{
                    name: nameOrEmali
                }, {
                    email: nameOrEmali
                }],
                password: password
            }
        });
        return data;
    }
}