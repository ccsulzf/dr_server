/**
 * Created by wp on 2017-01-05.
 */
export class TestService {
	constructor(transaction) {
		this.transaction = transaction || null;
	}

	async test() {
		return 'Hello World!';
	}
}