import 'webextension-polyfill';
import { setBreakState, getBreakState } from '../../../globalStatus';
import {
  addToGlobalArray,
  updateGlobalArrayEntry,
  getGlobalArray,
  getFlagValue
} from '../../../globalStatus';
import { GlobalArrayEntry } from '../../../globalStatus';
import { get } from 'http';

// chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(error => console.error(error));
let tabId = 0;

function getTabId() {
  return tabId;
}

function setTabId(id: number) {
  tabId = id;
}


chrome.tabs.onActivated.addListener(activeInfo => {
  
  console.log('1b) Switched to different tab');
  showSummary(activeInfo.tabId);
  setTabId(activeInfo.tabId);
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
async function sendPageContentToBackend(content: string) {
  const tab = await chrome.tabs.get(getTabId())
  fetch('http://127.0.0.1:5000/post_content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pageContent: content })
  })
    .then(response => response.json())
    .then(async data => {
      console.log('Received from backend:', data.aiResponse);
      //check here first if data.receivedContent is contains true
      if (!data.aiResponse.includes("true")) {
        if (!getFlagValue(tab.url?.toString() || '')) {
          console.log('Flag is set to false');
          await chrome.scripting.executeScript({
            target: { tabId: getTabId() },
            files: ['content-runtime/index.iife.js'],
          });
        }
      }
    })
    .catch(error => console.error('Error:', error));
  
  
}



async function showSummary(tabId: number) {
 
  const tab = await chrome.tabs.get(tabId);

  addToGlobalArray({ url: tab.url?.toString() || '', flag: false })
  console.log('Global array:', getGlobalArray());
  if (!tab.url || !tab.url.startsWith('http')) {
    return;
  }
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['content/index.iife.js'],
  });
}
