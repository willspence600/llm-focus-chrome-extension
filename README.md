# RECLaiM Overview

RECLaiM is a Chrome extension designed to enhance focus during study sessions. Users begin by specifying their study topic and method, and RECLaiM leverages **Cohere's Command R+ API** to analyze the content of visited websites. If a site’s content doesn't align with the user’s focus, it is dynamically blocked, presenting a prompt with the reason for the block. Users can justify access to the site if necessary, creating a flexible, intelligent study companion that encourages productivity while allowing room for legitimate diversions.

## Achievements

We are proud to announce that RECLaiM made it to the final judging round at QHACKS 2025! Out of *80 competitive hackathon teams*, RECLaiM landed us in *4th place*!

Additionally, we received the award for "Best Use of Terraform" for our innovative approach and effective implementation. Each member of the RECLaiM team had the privilege of taking home **Keychron K8 Wireless Keyboards**! Big thanks to Major League Hacking for sponsoring our prizes!

## Inspiration

As individuals with ADHD, we’ve often struggled to stay focused while studying online. Existing tools like website blockers felt overly restrictive, often blocking entire sites we needed access to, leading to frustration and frequent disabling of the tools. This inspired us to create a smarter solution: RECLaiM, an adaptive Chrome extension that uses AI to dynamically evaluate website relevance based on the user's focus, providing a tailored approach to staying on track.

## System Overview

There are three main components to the RECLaiM Chrome extension:
1. **Service Worker**: 
    - Notices when the current tab changes (e.g., switching tabs, new website, reloading the page, etc.).
    - Always runs in the background of Chrome.
    - It runs on the client side, but you can think of it as a "middle-end" instead of being part of the frontend/backend.
2. **Content Script**: 
    - Controlled by the service worker.
    - Whenever a new URL is accessed, the service worker injects the content script to grab the text content of the page and send it back.
3. **Flask Backend Server**: 
    - Encapsulates the LLM prompting and webpage binary classification.
    - Receives text data from the service worker, then sends `True` or `False` back to the service worker.
    - `True` = The webpage is related to the study topic.
    - `False` = The webpage is unrelated to the study topic; block the page.

## How RECLaiM Works: Step-By-Step

Here is how the RECLaiM system works during a study session:
1. Tab changes. The **service worker** notices this and activates the **content script**.
    - *Case A: Could be a refresh or new site visited in the current tab.*
    - *Case B: Could be switching tabs.*
2. The **content script** parses the text data from the active tab.
3. The **content script** sends the text back to the service worker (*chrome.runtime.sendMessage*).
    - *NOTE: The service worker is constantly waiting for messages -- updates every ~1 sec.*
4. The **service worker** receives the text data (*chrome.runtime.onMessage.addListener*).
5. The **service worker** sends the text data to the Flask backend.
6. The **Flask backend** receives the text data.
7. The **Flask backend** inserts the text data into the system prompt and sends it to the Command R+ API.
8. The **Flask backend** receives the API's response and checks if “True” is contained.
9. The **Flask backend** sends *True* or *False* back to the service worker.
10. If the **service worker** receives *False*, it blocks the page.
