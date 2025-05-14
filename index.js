#!/usr/bin/env node
import axios from 'axios';
import node from 'node:fs/promises';
import formatter from './src/formatter.js';

export default function loader(url, path) {
  const filePath = `${path}/${formatter(url)}`;

  return axios
    .get(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
      return node.appendFile(filePath, response.data);
    })
    .then(() => {
      console.log(filePath);
      return filePath;
    })
    .catch((error) => {
      console.error('Error:', error.message);
      throw error; // Проброс ошибки для обработки снаружи
    });
}
