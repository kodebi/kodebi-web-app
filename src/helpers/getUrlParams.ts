export function getUrlParams({ searchObj }: { searchObj: string }): URLSearchParams | undefined {
  if (searchObj) {
    return new URLSearchParams(searchObj);
  }
}
