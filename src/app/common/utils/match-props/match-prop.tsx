export interface MatchProp<T> {
	isExact: boolean;
	params: T;
	path: string;
	url: string;
}
