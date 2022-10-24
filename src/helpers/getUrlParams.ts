export function getUrlParams(searchObj: string) {
	if (searchObj) {
		return new URLSearchParams(searchObj);
	}
}
