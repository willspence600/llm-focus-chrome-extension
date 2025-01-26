// import { exampleThemeStorage } from '@extension/storage';

// export async function toggleTheme() {
//   console.log('initial theme:', await exampleThemeStorage.get());
//   // await exampleThemeStorage.toggle();
//   console.log('toggled theme:', await exampleThemeStorage.get());
// }
import { isProbablyReaderable, Readability } from '@mozilla/readability';

function canBeParsed(document: Document): boolean {
  return isProbablyReaderable(document, {
    minContentLength: 100,
  });
}

export function parse(document: Document): string | false {
  console.log('document:', document);
  if (!canBeParsed(document)) {
    return false;
  }
  const documentClone = document.cloneNode(true) as Document;
  const article = new Readability(documentClone).parse();
  console.log('article:', typeof article?.textContent);
  return article?.textContent || '';
}

console.log('extract content');
