import 'webextension-polyfill';

console.log('background script is working!');
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(error => console.error(error));

chrome.tabs.onActivated.addListener(activeInfo => {
  console.log('activated');
  showSummary(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(async tabId => {
  console.log('tab updated');
  showSummary(tabId);
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.pageContent) {
    console.log('Received page content:', message.pageContent);
    console.log('Some BS:', sender, sendResponse);
    chrome.storage.session.set({ pageContent: message.pageContent });
  }
});

async function showSummary(tabId: number) {
  const tab = await chrome.tabs.get(tabId);
  if (!tab.url || !tab.url.startsWith('http')) {
    return;
  }
  console.log('after:', tabId);
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['content/index.iife.js'],
  });
}
