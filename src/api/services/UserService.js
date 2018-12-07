/**
 * Created by wp on 2017-01-05.
 */
export class UserService {
    constructor(transaction) {
        this.transaction = transaction || null;
    }

    async login(nameOrEmali, password) {
        let data = await User.find({
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