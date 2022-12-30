export function dateFormatter({ date }: { date?: string } = {}): string | undefined {
  if (date) {
    return date.slice(0, 16).concat(" Uhr").split("T").join(" | ");
  } else {
    console.log("enter a valid date");
  }
}
