import 'webextension-polyfill';

// chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(error => console.error(error));

chrome.tabs.onActivated.addListener(activeInfo => {
  console.log('1b) Switched to different tab');
  showSummary(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    console.log('1a) Current tab updated');
    showSummary(tabId);
  }
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.pageContent) {  
    console.log('4) Service worker received page content:', message.pageContent.slice(0, 25));
    sendPageContentToBackend(message.pageContent);
    // chrome.storage.session.set({ pageContent: message.pageContent }); 
  }
});
function sendPageContentToBackend(content: string) {
  fetch('http://127.0.0.1:5000/post_content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pageContent: content })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Received from backend:', data.receivedContent);
    })
    .catch(error => console.error('Error:', error));
}


async function showSummary(tabId: number) {
  const tab = await chrome.tabs.get(tabId);
  if (!tab.url || !tab.url.startsWith('http')) {
    return;
  }
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['content/index.iife.js'],
  });
}
