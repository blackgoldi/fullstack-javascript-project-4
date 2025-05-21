#!/usr/bin/env node
import axios from 'axios';
import node from 'node:fs/promises';
import formatter from './src/formatter.js';
import nock from 'nock';
import * as cheerio from 'cheerio';
import path from 'node:path';
import downloader from './src/downloader.js';

// const scope = nock('https://ru.hexlet.io')
//   .get('/courses')
//   .reply(
//     200,
//     `<!DOCTYPE html>
// <html lang="ru">
//   <head>
//     <meta charset="utf-8">
//     <title>Курсы по программированию Хекслет</title>
//   </head>
//   <body>
//     <img src="/assets/professions/nodejs.png" alt="Иконка профессии Node.js-программист" />
//     <h3>
//       <a href="/professions/nodejs">Node.js-программист</a>
//     </h3>
//   </body>
// </html>`
//   );

export default function loader(url, outputDir) {
  const baseName = formatter(url); //Форматирование URL

  const dirName = baseName.replace(/\.html$/, '_files'); //Название папки

  const resourceDir = path.join(outputDir, dirName); //Путь до папки

  return axios
    .get(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
      return response.data;
    })
    .then((data) =>
      node.mkdir(resourceDir, { recursive: true }).then(() => data)
    )
    .then((data) => {
      const imgPromises = [];

      const $ = cheerio.load(data);

      $('img[src]').map((_, img) => {
        const src = $(img).attr('src');
        if (!src.match(/\.(png|jpe?g)$/i)) return;

        const imageUrl = new URL(src, url).href;
        const imageName = formatter(imageUrl);
        const imagePath = path.join(resourceDir, imageName);

        imgPromises.push(
          downloader(imageUrl, imagePath).then(() => {
            $(img).attr('src', path.join(resourceDir));
          })
        );
      });
      return Promise.all(imgPromises).then(() => $.html());
    })
    .then((modifiedHtml) => {
      return node.appendFile(outputDir.join(outputDir, baseName), modifiedHtml);
    })
    .catch((error) => {
      console.error('Error:', error.message);
      throw error;
    });
}
