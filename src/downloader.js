import { createWriteStream } from "node:fs";
import axios from "axios";

export default function downloader(url, filePath) {
  return axios
    .get(url, { responseType: "stream" })
    .then((response) => {
      const writer = createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", () => {
        console.log(`Изображение загружено и сохранено по следующему пути ${filePath}`);
      });

      writer.on("error", (err) => {
        console.error("Error writing file:", err);
      });
    })
    .catch((error) => {
      console.error("Error downloading the image:", error);
    });
}
