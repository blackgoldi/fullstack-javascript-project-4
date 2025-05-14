import axios from 'axios';
import node, { mkdir } from 'node:fs/promises';
import formatter from './formatter.js';

function createFile(path, response) {
  return node.appendFile(path, response.data).then(() => {
    console.log(path);
    return response;
  });
}

export default function loader(url, path) {
  return axios.get(url).then((response) => {
    if (response.status === 200) {
      node
        .realpath(path)
        .then(() => {
          createFile(path + '/' + formatter(url), response);
        })
        .catch(() => {
          mkdir(path, { recursive: true }).then(() => {
            createFile(path + '/' + formatter(url), response);
          });
        });
    }
    return response;
  });
}
