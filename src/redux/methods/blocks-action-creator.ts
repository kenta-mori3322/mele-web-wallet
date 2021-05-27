import {
	BlocksStateActionTypes,
	IBlocksReducerAction,
} from "../reducers/blocks-reducer";
import BaseActionCreator from "./base-action-creator";

export default class BlocksActionCreator extends BaseActionCreator<
	BlocksStateActionTypes,
	IBlocksReducerAction
> {
	searchBlocks = async () => {
		this.dispatch({
			type: BlocksStateActionTypes.LOAD_BLOCKS_REQUEST,
		});
	};

	getBlock = async (height: number) => {
		this.dispatch({
			type: BlocksStateActionTypes.LOAD_BLOCK_REQUEST,
			height: height,
		});
	};

	getBlocksCount = async () => {
		this.dispatch({
			type: BlocksStateActionTypes.GET_BLOCKS_COUNT_REQUEST,
		});
	};
}
