import Route from "route-parser";

export class PathUtil {
	public static GeneratePath = (
		path: string,
		params: {
			[key: string]: string | number;
		},
	): string => {
		const route = new Route(path);
		return route.reverse(params) as string;
	};

	public static GetLanguage = (currentPath: string): string => {
		const route = new Route("/:language");
		const result = route.match(currentPath.substring(0, 3)) as any;
		return result.language as string;
	};

	public static ChangeLanguageInGeneratedPath = (
		currentPath: string,
		language: string,
	): string => {
		const pathWithLanguageVariable = `/:language${currentPath.substring(2)}`;
		return PathUtil.GeneratePath(pathWithLanguageVariable, {
			language: language,
		});
	};
}
