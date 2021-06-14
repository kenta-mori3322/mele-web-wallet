import MainService from "./main-api-service";

export default class StaticService extends MainService {
	getStaticInfo = async () => {
		return await this.get({
			path: `/meta`,
		});
	};
	getStaticNumbers = async () => {
		return await this.get({
			path: `/transaction?statistics`,
		});
	};
}
export const staticService = new StaticService();
