export default function formatter(url) {
  const myURL = new URL(url);

  const host = myURL.host;

  let pathname = myURL.pathname;

  const combined = host + pathname;

  let filtered = String(combined.replace(/[./]/g, "-"));
  if (filtered.endsWith("-", combined.length)) {
    filtered = filtered.slice(0, combined.length - 1);
  }

  return filtered;
}
