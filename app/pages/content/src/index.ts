import { isProbablyReaderable, Readability } from '@mozilla/readability';

function canBeParsed(document: Document): boolean {
  return isProbablyReaderable(document, {
    minContentLength: 100,
  });
}

function parse(document: Document): string | false {
  console.log('document:', document);
  if (!canBeParsed(document)) {
    return false;
  }
  const documentClone = document.cloneNode(true) as Document;
  const article = new Readability(documentClone).parse();
  console.log('article:', typeof article?.textContent);
  return article?.textContent || '';
}

const res = parse(window.document);
console.log('document', res);
chrome.runtime.sendMessage({ pageContent: res });
