import { afterAll, beforeAll, expect, test } from "vitest";
import nock from "nock";
import { readFile } from "node:fs/promises";
import fs from "fs";
import path from "node:path";
import loader from '../index.js';

const url = "https://ru.hexlet.io/courses";
const outputDir = path.resolve("./__tests__/output");
const baseName = "ru-hexlet-io-courses";
const dirName = baseName + "_files";
let expectedHtml = "";

beforeAll(async () => {
  nock("https://ru.hexlet.io")
    .get("/courses")
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

  const imageBuffer = await fs.readFile(path.resolve("__fixtures__", "nodejs.png"));
  nock("https://ru.hexlet.io").get("/assets/professions/nodejs.png").reply(200, imageBuffer);

  expectedHtml = await readFile("__fixtures__/expectedImg.html", {
    encoding: "utf8",
  });
});

afterAll(() => {
  nock.cleanAll();
});

test("img loader", async () => {
  await loader(url, outputDir);

  const htmlPath = path.join(outputDir, `${baseName}.html`);
  const htmlContent = await fs.readFile(htmlPath, "utf-8");

  expect(htmlContent.trim()).toBe(expectedHtml.trim());
  const imagePath = path.join(outputDir, dirName, "ru-hexlet-io-assets-professions-nodejs.png");
  await expect(fs.access(imagePath)).resolves.not.toThrow();

  // expect(data.replace(/\r\n/g, "\n")).toEqual(expectedHtml.replace(/\r\n/g, "\n"));
});

// test('changeLinks', async () => {});
