import MainService from "./main-api-service";
const { Mele, MnemonicSigner, Utils } = require("mele-sdk");

const sdk = new Mele({
	nodeUrl: "http://3.19.27.59:26657",
	indexerEndpoint: "http://3.17.204.165:3100/api/v1",
	chainId: "devnet",
	signer: new MnemonicSigner(
		"pet apart myth reflect stuff force attract taste caught fit exact ice slide sheriff state since unusual gaze practice course mesh magnet ozone purchase",
	),
});

export interface ISearchValidatorsParameter {
	page: number;
	size: number;
}

export default class ValidatorsService extends MainService {
	getValidators = async (p: ISearchValidatorsParameter) => {
		const pool = await sdk.query.staking.getPool();
		let validators = await sdk.query.staking.getValidators();
		let cumulativeShare = 0;
		validators.sort(function (a: any, b: any) {
			if (a.tokens < b.tokens) return -1;
			if (a.tokens > b.tokens) return 1;
			return 0;
		});

		await asyncForEach(validators, async (validator: any) => {
			validator.uptime = await sdk.indexer.validatorUptime(
				validator.consensus_pubkey,
			);
			validator.delegator_address = Utils.encodeAddress(
				Utils.decodeAddress(validator.operator_address, "melevaloper"),
				"mele",
			);
			validator.tokenPercentage =
				parseFloat(validator.tokens) / parseFloat(pool.bonded_tokens);
			cumulativeShare += validator.tokenPercentage;
			validator.cumulativeShares = cumulativeShare;
		});

		return validators;
	};

	getValidator = async (address: string) => {
		const pool = await sdk.query.staking.getPool();
		const validator = await sdk.query.staking.getValidator(address);
		validator.uptime = await sdk.indexer.validatorUptime(
			validator.consensus_pubkey,
		);
		validator.delegator_address = Utils.encodeAddress(
			Utils.decodeAddress(validator.operator_address, "melevaloper"),
			"mele",
		);
		validator.delegations = await sdk.query.staking.getValidatorDelegations(
			address,
		);
		validator.tokenPercentage =
			parseFloat(validator.tokens) / parseFloat(pool.bonded_tokens);
		return validator;
	};
}

async function asyncForEach(array: any, callback: any) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

export const validatorsService = new ValidatorsService();
