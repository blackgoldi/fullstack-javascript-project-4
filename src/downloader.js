import { createWriteStream } from 'node:fs';
import axios from 'axios';

export default function downloader(url, filePath) {
  return axios({
    method: 'get',
    url: url,
    responseType: 'stream',
  }).then(function (response) {
    response.data.pipe(createWriteStream(filePath));
  });
}
