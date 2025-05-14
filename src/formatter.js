export default function formatter(url) {
  return (
    url
      .slice(url.search(/(?<=\/\/).+$/), url.length) //отрезаем протокол из результирующей строки
      .replaceAll(/[^a-zA-Z0-9]/g, '-') + '.html' //заменяем все символы, кроме букв и символа точки на тире, добавляем расширение файла
  );
}
