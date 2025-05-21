import path from 'path';

export default function formatter(url) {
  const myURL = new URL(url);

  const host = myURL.host;

  let pathname = myURL.pathname;

  if (pathname.endsWith('/')) {
    pathname += '.html';
  }

  const combined = host + pathname;

  const ext = path.extname(pathname) || '.html';

  const nameOlny = combined.slice(0, -ext.length);

  const safeName = nameOlny.replace(/[^a-zA-Z0-9]/g, '-');

  return safeName + ext;
  // return (myURL.host + myURL?.pathname).replaceAll(/[^a-zA-Z0-9]/g, '-');
}
