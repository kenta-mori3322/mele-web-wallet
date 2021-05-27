import { ITRANSACTIONModel } from "./transactions-reducer";

export interface IBlockModel {
	block: Block;
	events: object;
	txs: ITRANSACTIONModel[];
}

interface Block {
	_id: string;
	hash: string;
	height: number;
	lastBlockHash: string;
	precommitsCount: number;
	proposerAddress: string;
	time: string;
	transNum: string;
	validators: Array<string>;
	validatorsCount: number;
}

export enum BlocksStateActionTypes {
	LOAD_BLOCKS_REQUEST = "@@BLOCKS/LOAD_BLOCKS_REQUEST",
	LOAD_BLOCKS_SUCCESS = "@@BLOCKS/LOAD_BLOCKS_SUCCESS",
	LOAD_BLOCKS_ERROR = "@@BLOCKS/LOAD_BLOCKS_ERROR",
	LOAD_BLOCK_REQUEST = "@@BLOCKS/LOAD_BLOCK_REQUEST",
	LOAD_BLOCK_SUCCESS = "@@BLOCKS/LOAD_BLOCK_SUCCESS",
	LOAD_BLOCK_ERROR = "@@BLOCKS/LOAD_BLOCK_ERROR",
	GET_BLOCKS_COUNT_REQUEST = "@@BLOCKS/GET_BLOCKS_COUNT_REQUEST",
	GET_BLOCKS_COUNT_SUCCESS = "@@BLOCKS/GET_BLOCKS_COUNT_SUCCESS",
	GET_BLOCKS_COUNT_ERROR = "@@BLOCKS/GET_BLOCKS_COUNT_ERROR",
}

export enum LoadBlocksStatus {
	REQUESTED,
	SUCCESS,
	ERROR,
	GENERATED_BLOCKS_REQUESTED,
}

export class BlocksState {
	loadedBlocks: Block[];
	totalCount: number;
	generatedBlocksCount: number;
	loadedBlock?: IBlockModel;
	loadBlocksStatus: LoadBlocksStatus;
}

export class IBlocksReducerAction {
	page: number;
	size: number;
	height: number;
	type: BlocksStateActionTypes;
	loadedBlocks: Block[];
	totalCount: number;
	loadedBlock: IBlockModel;
	generatedBlocksCount: number;
}

export const initialState: BlocksState = new BlocksState();

const blocksReducer = (
	state: BlocksState = initialState,
	action: IBlocksReducerAction,
): BlocksState => {
	switch (action.type) {
		case BlocksStateActionTypes.LOAD_BLOCKS_REQUEST:
			return {
				...state,
				loadBlocksStatus: LoadBlocksStatus.REQUESTED,
			};
		case BlocksStateActionTypes.LOAD_BLOCKS_SUCCESS:
			return {
				...state,
				loadedBlocks: action.loadedBlocks,
				totalCount: action.totalCount,
			};
		case BlocksStateActionTypes.LOAD_BLOCKS_ERROR:
			return {
				...state,
				loadBlocksStatus: LoadBlocksStatus.ERROR,
				loadedBlocks: [],
				totalCount: 0,
			};
		case BlocksStateActionTypes.GET_BLOCKS_COUNT_REQUEST:
			return {
				...state,
				loadBlocksStatus: LoadBlocksStatus.GENERATED_BLOCKS_REQUESTED,
			};
		case BlocksStateActionTypes.GET_BLOCKS_COUNT_SUCCESS:
			return {
				...state,
				generatedBlocksCount: action.generatedBlocksCount,
			};
		case BlocksStateActionTypes.GET_BLOCKS_COUNT_ERROR:
			return {
				...state,
				generatedBlocksCount: 0,
			};
		case BlocksStateActionTypes.LOAD_BLOCK_REQUEST:
			return {
				...state,
			};
		case BlocksStateActionTypes.LOAD_BLOCK_SUCCESS:
			return {
				...state,
				loadedBlock: action.loadedBlock,
			};
		case BlocksStateActionTypes.LOAD_BLOCK_ERROR:
			return {
				...state,
				loadedBlock: undefined,
			};
		default:
			return {
				...state,
			};
	}
};

export default blocksReducer;
