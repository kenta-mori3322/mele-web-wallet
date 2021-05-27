import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
	BlocksStateActionTypes,
	IBlocksReducerAction,
} from "mele-web-wallet/redux/reducers/blocks-reducer";
import {
	blocksService,
	ISearchBlocksParameter,
} from "../../api/blocks-service";
export const blocksSaga = function* handleMessage(params: any): SagaIterator {
	yield takeLatest(BlocksStateActionTypes.LOAD_BLOCKS_REQUEST, searchBlocks);
	yield takeLatest(BlocksStateActionTypes.LOAD_BLOCK_REQUEST, getBlock);
	yield takeLatest(
		BlocksStateActionTypes.GET_BLOCKS_COUNT_REQUEST,
		getGeneratedBlocks,
	);
};

function* searchBlocks(action: IBlocksReducerAction): SagaIterator {
	try {
		const p: ISearchBlocksParameter = {
			page: action.page,
			size: action.size || 9999,
			height: action.height,
		};

		const response = yield call(blocksService.getBlocks, p);
		return yield put({
			type: BlocksStateActionTypes.LOAD_BLOCKS_SUCCESS,
			loadedBlocks: response,
			totalCount: response.length,
		});
	} catch (e) {
		return yield put({
			type: BlocksStateActionTypes.LOAD_BLOCKS_ERROR,
			loadedBlocks: [],
			totalCount: 0,
		});
	}
}

function* getBlock(action: IBlocksReducerAction): SagaIterator {
	try {
		const response = yield call(blocksService.getBlock, action);
		return yield put({
			type: BlocksStateActionTypes.LOAD_BLOCK_SUCCESS,
			loadedBlock: response,
		});
	} catch (e) {
		return yield put({
			type: BlocksStateActionTypes.LOAD_BLOCK_ERROR,
			loadedBlock: undefined,
		});
	}
}

function* getGeneratedBlocks(action: IBlocksReducerAction): SagaIterator {
	try {
		const response = yield call(blocksService.getBlockCount);
		return yield put({
			type: BlocksStateActionTypes.GET_BLOCKS_COUNT_SUCCESS,
			generatedBlocksCount: response,
		});
	} catch (e) {
		return yield put({
			type: BlocksStateActionTypes.GET_BLOCKS_COUNT_ERROR,
			generatedBlocksCount: 0,
		});
	}
}
