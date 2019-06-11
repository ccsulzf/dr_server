/**
 * Created by wp on 2017-01-05.
 */
import {
	FundAccountService
} from './FundAccountService';
export class TestService {
	constructor(transaction) {
		this.transaction = transaction || null;
	}

	async test() {
		try {
			const fundAccountService = new FundAccountService(this.transaction);
			await fundAccountService.editFundCountAmount(4, 'cut', 100);
			await fundAccountService.editFundCountAmount(4, 'plus', 100);
		} catch (error) {
			throw error;
		}
	}
}