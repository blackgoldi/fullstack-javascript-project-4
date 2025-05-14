import axios from 'axios';
import { beforeAll, expect, test } from 'vitest';
import nock from 'nock';
import fsPromise, { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const scope = nock('https://ru.hexlet.io')
  .get('/courses')
  .reply(
    200,
    `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Курсы по программированию Хекслет</title>
  </head>
  <body>
    <img src="/assets/professions/nodejs.png" alt="Иконка профессии Node.js-программист" />
    <h3>
      <a href="/professions/nodejs">Node.js-программист</a>
    </h3>
  </body>
</html>`
  );

const expectedHtml = await readFile('__fixtures__/ExpectedHtml.html', { encoding: 'utf8' });

const path =
  'https://ru.hexlet.io/courses'
    .slice(
      'https://ru.hexlet.io/courses'.search(/(?<=\/\/).+$/),
      'https://ru.hexlet.io/courses'.length
    )
    .replaceAll(/[^a-zA-Z0-9]/g, '-') + '.html';

test('equialExpected', async () => {
  const data = await axios
    .get('https://ru.hexlet.io/courses')
    .then(function (response) {
      if (response.status == 200) {
        return response.data;
      }
    });
  expect(data.replace(/\r\n/g, '\n')).toEqual(expectedHtml.replace(/\r\n/g, '\n'));
});

test('changeLinks',async()=>{

});
