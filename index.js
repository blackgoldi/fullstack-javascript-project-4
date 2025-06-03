#!/usr/bin/env node
import axios from "axios";
import formatter from "./src/formatter.js";
import nock from "nock";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "node:path";
import { mkdir, appendFile } from "node:fs/promises";
import downloader from "./src/downloader.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

nock("https://ru.hexlet.io")
  .get("/courses")
  .reply(
    200,
    `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Курсы по программированию Хекслет</title>
    <link rel="stylesheet" media="all" href="https://cdn2.hexlet.io/assets/menu.css">
    <link rel="stylesheet" media="all" href="/assets/application.css" />
    <link href="/courses" rel="canonical">
  </head>
  <body>
    <img src="/assets/professions/nodejs.png" alt="Иконка профессии Node.js-программист" />
    <h3>
      <a href="/professions/nodejs">Node.js-программист</a>
    </h3>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://ru.hexlet.io/packs/js/runtime.js"></script>
  </body>
</html>`
  );
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imagePath = resolve(__dirname, "__fixtures__", "nodejs.png");
const imageBuffer = fs.readFileSync(imagePath);

nock("https://ru.hexlet.io").get("/assets/professions/nodejs.png").reply(200, imageBuffer);

export default function loader(url, outputDir) {
  const baseName = formatter(url); //Форматирование URL

  const dirName = baseName + "_files"; //Название папки

  const resourceDir = path.join(outputDir, dirName); //Путь до папки

  return axios
    .get(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`Unexpected status code: ${response.status}`); //Вывод если ошибка
      }
      return response.data;
    })
    .then((data) => mkdir(resourceDir, { recursive: true }).then(() => data))
    .then((data) => {
      const imgPromises = [];
      const $ = cheerio.load(data);
      $("img[src]").map((_, img) => {
        const src = img.attribs["src"];

        if (!src.match(/\.(png|jpe?g)$/i)) return; //Проверка на jpe/jpeg/png

        const imageUrl = new URL(src, url).href; //ссылка для загрузки

        const imageName = formatter(imageUrl.slice(0, -path.extname(imageUrl).length)); //Имя файла

        const imagePath = path.join(dirName, imageName + path.extname(imageUrl)); //Путь для сохранения

        imgPromises.push(downloader(imageUrl, imagePath).then(() => $(img).attr("src", imagePath)));
      });
      return Promise.all(imgPromises).then(() =>
        appendFile(path.join(outputDir, baseName + ".html"), $.html())
      );
    })
    .catch((error) => {
      throw Promise.reject("rejected promise");
    });
}
