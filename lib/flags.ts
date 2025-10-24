export function flagUrl(iso2: string) {
  if (!iso2) return "";
  return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
}
