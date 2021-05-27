declare module "redux-wait-for-action" {
	export { WAIT_FOR_ACTION, ERROR_ACTION } from "redux-wait-for-action";
	import createReduxWaitForMiddleware from "redux-wait-for-action";
	export default createReduxWaitForMiddleware;
}
