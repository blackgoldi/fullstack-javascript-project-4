export default function formatter(url) {
  const myURL = new URL(url);
  return (myURL.host + myURL?.pathname).replaceAll(/[^a-zA-Z0-9]/g, '-') + '.html';
}
