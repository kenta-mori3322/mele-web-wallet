import MainService from "./main-api-service";
import buildUrl from "build-url";
const { Mele, MnemonicSigner } = require("mele-sdk");

const mnemonic =
	"around fire birth cradle assault equal risk dune goat recycle torch hole control pluck cry math noble crystal language uncover leave ski dust answer";

const sdk = new Mele({
	nodeUrl: "http://3.126.68.149:26657/",
	chainId: "devnet",
	signer: new MnemonicSigner(mnemonic),
	indexerEndpoint: "http://18.192.179.29:3100/api/v1",
});

export interface ISearchBlocksParameter {
	page: number;
	size: number;
	height: number;
}

export default class BlocksService extends MainService {
	getBlocks = async (p: ISearchBlocksParameter) => {
		const blocks = await sdk.indexer.blocks();
		return blocks;
	};
	getBlock = async (p: ISearchBlocksParameter) => {
		const blocks = await sdk.indexer.block(p.height);
		return blocks;
	};
	getBlockCount = async () => {
		const count = await sdk.indexer.blocks();
		return count[0].height;
	};
}

async function asyncForEach(array: any, callback: any) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

export const blocksService = new BlocksService();
