import {
    TestService
} from '../services';
import _ from "lodash";

export async function test(ctx, next) {
    ctx.body = await new TestService().test();
}

export async function login(ctx, next) {
    ctx.body = true;
}