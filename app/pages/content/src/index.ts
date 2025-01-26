import { isProbablyReaderable, Readability } from '@mozilla/readability';

function canBeParsed(document: Document): boolean {
  return isProbablyReaderable(document, {
    minContentLength: 100,
  });
}

function parse(document: Document): string {
  console.log('2) Content script is parsing');
  if (!canBeParsed(document)) {
    console.log('SPECIAL CASE: Page cannot be parsed');
    return '';
  }
  const documentClone = document.cloneNode(true) as Document;
  const article = new Readability(documentClone).parse();
  // console.log('article:', article?.t extContent);
  return article?.textContent?.trim() || '';
}



const res = parse(window.document);
console.log("3) Content script is sending the text. First 25 chars: ", res.slice(0,25))
chrome.runtime.sendMessage({ pageContent: res });


