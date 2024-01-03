export function objectToQueryString(obj: Record<string, string>) {
  return new URLSearchParams(obj).toString();
}
