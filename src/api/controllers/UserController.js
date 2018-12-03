import {
    UserService
} from '../services';

export async function login(ctx, next) {
    let nameOrEmali = ctx.request.body.nameOrEmali;
    let password = ctx.request.body.password;
    ctx.body = await new UserService().login(nameOrEmali, password);
}