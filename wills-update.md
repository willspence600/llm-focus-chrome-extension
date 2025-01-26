# System Overview
There are three main components to the extension:
- **Service worker**: Notices when the current tab changes (e.g. switching tabs, new website, reloaded the page, etc). Always runs in the background of Chrome. It runs on the client side, but you can think of it as a "middle-end" instead of being part of the frontend/backend.
- **Content script**: Controlled by the service worker. Whenever a new URL is accessed, the service worker runs the content script to grab the text content of the page and send it back.
- **Flask backend**: Encapsulates the LLM prompting and webpage classification. Receives text data from the service worker, then sends it back to the service worker.
 ****

Here is how the system works during a study session:
1.	Tab changes. The **service worker** notices this and activates the **content script**.
    - *Case a: Could be a refresh or new site visited in the current tab*
    - *Case b: Could be switching tabs*
2.	The **content script** parses the tab’s text data
3.	The **content script** sends the text back to the service worker (*chrome.runtime.sendMessage*)
    - *NOTE: The service worker is constantly waiting for messages, updates every ~1 sec*
4.	The **service worker** receives the text data (*chrome.runtime.onMessage.addListener*)
5.	The **service worker** sends the text data to the Flask backend
6.	The **Flask backend** receives the text data
7.	The **Flask backend** inserts the text data to the system prompt and sends it to Command R+ API
8.	The **Flask backend** receives the APIs response and checks if “True” is contained.
9.	The **Flask backend** sends *True* or *False* back to the service worker
10.	If the **service worker** receives *True*, it blocks the page.
