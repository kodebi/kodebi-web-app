export function dateFormatter(date: string) {
	if (date) {
		return date.slice(0, 16).concat(' Uhr').split('T').join(' | ');
	}
}
